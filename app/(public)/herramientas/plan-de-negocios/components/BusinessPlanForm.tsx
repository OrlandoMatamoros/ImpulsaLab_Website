'use client'

import { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export interface BusinessPlanFormData {
  businessName: string
  industry: string
  location: string
  stage: string
  description: string
  mainProduct: string
  idealClient: string
  differentiator: string
  initialInvestment: string
  monthlySales: string
  seeksFunding: boolean
  fundingAmount: string
  employees: string
}

const INITIAL_FORM: BusinessPlanFormData = {
  businessName: '',
  industry: '',
  location: '',
  stage: '',
  description: '',
  mainProduct: '',
  idealClient: '',
  differentiator: '',
  initialInvestment: '',
  monthlySales: '',
  seeksFunding: false,
  fundingAmount: '',
  employees: '',
}

function SelectWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00BCD4]" />
    </div>
  )
}

export default function BusinessPlanForm({
  onSubmit,
  loading,
}: {
  onSubmit: (data: BusinessPlanFormData) => void
  loading: boolean
}) {
  const { t } = useLanguage()
  const bp = t.businessPlanPage
  const uid = useId()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<BusinessPlanFormData>(INITIAL_FORM)
  const [industryOther, setIndustryOther] = useState('')

  function update(field: keyof BusinessPlanFormData, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const effectiveIndustry =
    form.industry === 'Otro' || form.industry === 'Other'
      ? industryOther.trim()
      : form.industry

  function canAdvance(): boolean {
    if (step === 1) {
      if (!form.businessName) return false
      if (!form.industry) return false
      if ((form.industry === 'Otro' || form.industry === 'Other') && !industryOther.trim())
        return false
      return true
    }
    if (step === 2) return !!form.description
    return true
  }

  function handleSubmit() {
    if (!canAdvance()) return
    onSubmit({ ...form, industry: effectiveIndustry })
  }

  const inputClass =
    'w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00BCD4] focus:border-transparent transition-all disabled:opacity-50'
  const labelClass = 'block text-sm font-medium text-slate-300 mb-1.5'
  const selectClass =
    'w-full pl-4 pr-10 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-[#00BCD4] focus:border-transparent transition-all disabled:opacity-50 appearance-none cursor-pointer'

  const showOtherInput = form.industry === 'Otro' || form.industry === 'Other'

  return (
    <div className="max-w-2xl mx-auto">
      {/* Step indicator */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => !loading && s < step && setStep(s)}
              disabled={loading || s > step}
              aria-label={`Step ${s}`}
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all cursor-pointer ${
                s === step
                  ? 'bg-[#00BCD4] text-white'
                  : s < step
                    ? 'bg-[#00BCD4]/20 text-[#00BCD4] hover:bg-[#00BCD4]/30'
                    : 'bg-slate-800 text-slate-500'
              }`}
            >
              {s < step ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                s
              )}
            </button>
            {s < 3 && (
              <div className={`w-12 h-0.5 ${s < step ? 'bg-[#00BCD4]/40' : 'bg-slate-800'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step labels */}
      <div className="flex justify-between mb-8 px-2">
        <span className={`text-xs ${step === 1 ? 'text-[#00BCD4]' : 'text-slate-500'}`}>
          {bp.step1Title}
        </span>
        <span className={`text-xs ${step === 2 ? 'text-[#00BCD4]' : 'text-slate-500'}`}>
          {bp.step2Title}
        </span>
        <span className={`text-xs ${step === 3 ? 'text-[#00BCD4]' : 'text-slate-500'}`}>
          {bp.step3Title}
        </span>
      </div>

      {/* Step 1: Basic Info */}
      {step === 1 && (
        <div className="space-y-5">
          <div>
            <label htmlFor={`${uid}-businessName`} className={labelClass}>
              {bp.businessNameLabel} *
            </label>
            <input
              id={`${uid}-businessName`}
              type="text"
              value={form.businessName}
              onChange={(e) => update('businessName', e.target.value)}
              placeholder={bp.businessNamePlaceholder}
              disabled={loading}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor={`${uid}-industry`} className={labelClass}>
              {bp.industryLabel} *
            </label>
            <SelectWrapper>
              <select
                id={`${uid}-industry`}
                value={form.industry}
                onChange={(e) => update('industry', e.target.value)}
                disabled={loading}
                className={selectClass}
              >
                <option value="">{bp.industryPlaceholder}</option>
                {bp.industries.map((ind: string) => (
                  <option key={ind} value={ind}>
                    {ind}
                  </option>
                ))}
              </select>
            </SelectWrapper>
          </div>

          {showOtherInput && (
            <div>
              <label htmlFor={`${uid}-industryOther`} className={labelClass}>
                {bp.industryOtherLabel} *
              </label>
              <input
                id={`${uid}-industryOther`}
                type="text"
                value={industryOther}
                onChange={(e) => setIndustryOther(e.target.value)}
                placeholder={bp.industryOtherPlaceholder}
                disabled={loading}
                className={inputClass}
              />
            </div>
          )}

          <div>
            <label htmlFor={`${uid}-location`} className={labelClass}>
              {bp.locationLabel}
            </label>
            <input
              id={`${uid}-location`}
              type="text"
              value={form.location}
              onChange={(e) => update('location', e.target.value)}
              placeholder={bp.locationPlaceholder}
              disabled={loading}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor={`${uid}-stage`} className={labelClass}>
              {bp.stageLabel}
            </label>
            <SelectWrapper>
              <select
                id={`${uid}-stage`}
                value={form.stage}
                onChange={(e) => update('stage', e.target.value)}
                disabled={loading}
                className={selectClass}
              >
                <option value="">{bp.stagePlaceholder}</option>
                {bp.stages.map((s: string) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </SelectWrapper>
          </div>
        </div>
      )}

      {/* Step 2: Details */}
      {step === 2 && (
        <div className="space-y-5">
          <div>
            <label htmlFor={`${uid}-description`} className={labelClass}>
              {bp.descriptionLabel} *
            </label>
            <textarea
              id={`${uid}-description`}
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
              placeholder={bp.descriptionPlaceholder}
              rows={3}
              disabled={loading}
              className={`${inputClass} resize-y`}
            />
          </div>

          <div>
            <label htmlFor={`${uid}-mainProduct`} className={labelClass}>
              {bp.mainProductLabel}
            </label>
            <input
              id={`${uid}-mainProduct`}
              type="text"
              value={form.mainProduct}
              onChange={(e) => update('mainProduct', e.target.value)}
              placeholder={bp.mainProductPlaceholder}
              disabled={loading}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor={`${uid}-idealClient`} className={labelClass}>
              {bp.idealClientLabel}
            </label>
            <input
              id={`${uid}-idealClient`}
              type="text"
              value={form.idealClient}
              onChange={(e) => update('idealClient', e.target.value)}
              placeholder={bp.idealClientPlaceholder}
              disabled={loading}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor={`${uid}-differentiator`} className={labelClass}>
              {bp.differentiatorLabel}
            </label>
            <textarea
              id={`${uid}-differentiator`}
              value={form.differentiator}
              onChange={(e) => update('differentiator', e.target.value)}
              placeholder={bp.differentiatorPlaceholder}
              rows={2}
              disabled={loading}
              className={`${inputClass} resize-y`}
            />
          </div>
        </div>
      )}

      {/* Step 3: Financial */}
      {step === 3 && (
        <div className="space-y-5">
          <div>
            <label htmlFor={`${uid}-investment`} className={labelClass}>
              {bp.investmentLabel}
            </label>
            <SelectWrapper>
              <select
                id={`${uid}-investment`}
                value={form.initialInvestment}
                onChange={(e) => update('initialInvestment', e.target.value)}
                disabled={loading}
                className={selectClass}
              >
                <option value="">{bp.investmentPlaceholder}</option>
                {bp.investmentRanges.map((r: string) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </SelectWrapper>
          </div>

          <div>
            <label htmlFor={`${uid}-monthlySales`} className={labelClass}>
              {bp.monthlySalesLabel}
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">$</span>
              <input
                id={`${uid}-monthlySales`}
                type="number"
                inputMode="numeric"
                min={0}
                step={100}
                value={form.monthlySales}
                onChange={(e) => update('monthlySales', e.target.value)}
                placeholder={bp.monthlySalesPlaceholder}
                disabled={loading}
                className={`${inputClass} pl-8`}
              />
            </div>
          </div>

          <div>
            <span className={labelClass}>{bp.seeksFundingLabel}</span>
            <div className="flex gap-4 mt-1">
              <button
                type="button"
                onClick={() => update('seeksFunding', true)}
                disabled={loading}
                aria-pressed={form.seeksFunding}
                className={`px-5 py-2 rounded-xl border text-sm font-medium transition-all cursor-pointer ${
                  form.seeksFunding
                    ? 'border-[#00BCD4] bg-[#00BCD4]/10 text-[#00BCD4]'
                    : 'border-slate-700 text-slate-400 hover:border-slate-600'
                }`}
              >
                {bp.yes}
              </button>
              <button
                type="button"
                onClick={() => {
                  update('seeksFunding', false)
                  update('fundingAmount', '')
                }}
                disabled={loading}
                aria-pressed={!form.seeksFunding}
                className={`px-5 py-2 rounded-xl border text-sm font-medium transition-all cursor-pointer ${
                  !form.seeksFunding
                    ? 'border-[#00BCD4] bg-[#00BCD4]/10 text-[#00BCD4]'
                    : 'border-slate-700 text-slate-400 hover:border-slate-600'
                }`}
              >
                {bp.no}
              </button>
            </div>
          </div>

          {form.seeksFunding && (
            <div>
              <label htmlFor={`${uid}-fundingAmount`} className={labelClass}>
                {bp.fundingAmountLabel}
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">$</span>
                <input
                  id={`${uid}-fundingAmount`}
                  type="number"
                  inputMode="numeric"
                  min={0}
                  step={1000}
                  value={form.fundingAmount}
                  onChange={(e) => update('fundingAmount', e.target.value)}
                  placeholder={bp.fundingAmountPlaceholder}
                  disabled={loading}
                  className={`${inputClass} pl-8`}
                />
              </div>
            </div>
          )}

          <div>
            <label htmlFor={`${uid}-employees`} className={labelClass}>
              {bp.employeesLabel}
            </label>
            <SelectWrapper>
              <select
                id={`${uid}-employees`}
                value={form.employees}
                onChange={(e) => update('employees', e.target.value)}
                disabled={loading}
                className={selectClass}
              >
                <option value="">{bp.employeesPlaceholder}</option>
                {bp.employeeRanges.map((r: string) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </SelectWrapper>
          </div>
        </div>
      )}

      {/* Time warning — step 3 only */}
      {step === 3 && (
        <div className="mt-6 p-3 rounded-xl bg-[#00BCD4]/5 border border-[#00BCD4]/20 text-xs text-[#00BCD4] text-center">
          {bp.timeWarning}
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex justify-between mt-8">
        {step > 1 ? (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            disabled={loading}
            className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors text-sm cursor-pointer disabled:opacity-50"
          >
            {bp.back}
          </button>
        ) : (
          <div />
        )}

        {step < 3 ? (
          <button
            type="button"
            onClick={() => canAdvance() && setStep(step + 1)}
            disabled={!canAdvance() || loading}
            className="px-6 py-2.5 rounded-xl text-white font-semibold hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer bg-gradient-to-r from-[#002D62] to-[#00BCD4]"
          >
            {bp.next}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canAdvance() || loading}
            className="px-6 py-2.5 rounded-xl text-white font-semibold hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer bg-gradient-to-r from-[#002D62] to-[#00BCD4]"
          >
            {loading ? bp.generating : bp.generatePlan}
          </button>
        )}
      </div>
    </div>
  )
}
