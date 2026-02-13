// ============================================
// IMPULSA LAB - NAVIGATION TYPES
// ============================================

export type RootStackParamList = {
  LeadGate: undefined;
  DiagnosticWizard: undefined;
  Results: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
