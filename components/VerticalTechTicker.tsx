"use client";
import * as React from 'react';

interface TechTool {
  name: string;
  logo: React.ComponentType<{ className?: string }>;
  url: string;
  category: string;
  keywords: string[];
}

// ICONOS EXISTENTES Y NUEVOS
const GoogleAIIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const ChatGPTIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142-.0852 4.783-2.7582a.7712.7712 0 0 1 .7806 0l5.8428 3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0734a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
  </svg>
);

const ClaudeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M14.769 2.769A1 1 0 0 1 16.415 4L12.97 7.445a1 1 0 0 1-1.414 0L8.11 4a1 1 0 0 1 1.647-1.231L12 5.011l2.243-2.242ZM8.586 6.586a1 1 0 0 1 1.414 0L12 8.586l2-2a1 1 0 1 1 1.414 1.414l-2.707 2.707a1 1 0 0 1-1.414 0L8.586 8a1 1 0 0 1 0-1.414ZM12 12l4.243 4.243a1 1 0 0 1-1.414 1.414L12 14.828l-2.829 2.829a1 1 0 0 1-1.414-1.414L12 12Z"/>
  </svg>
);

const GeminiIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L13.09 5.26L16 4L14.74 7.26L18 8L14.74 8.74L16 12L13.09 10.74L12 14L10.91 10.74L8 12L9.26 8.74L6 8L9.26 7.26L8 4L10.91 5.26L12 2ZM12 18L10.91 21.26L8 20L9.26 16.74L6 16L9.26 15.26L8 12L10.91 13.26L12 10L13.09 13.26L16 12L14.74 15.26L18 16L14.74 16.74L16 20L13.09 21.26L12 18Z"/>
  </svg>
);

const GrokIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

const PerplexityIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 7v10l10 5 10-5V7l-10-5zM12 4.3L19.5 8 12 11.7 4.5 8 12 4.3zM4 9.5l7 3.5v7l-7-3.5v-7zm16 0v7l-7 3.5v-7l7-3.5z"/>
  </svg>
);

const MidjourneyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6L12 10.5 8.5 8 12 5.5 15.5 8zM8 12l2.5 2.5L8 17l-2.5-2.5L8 12zm8 0l2.5 2.5L16 17l-2.5-2.5L16 12zm-4 2.5L8.5 16 12 18.5 15.5 16 12 14.5z"/>
  </svg>
);

const FigmaIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.332 8.668a3.333 3.333 0 0 0 0-6.663H8.668a3.333 3.333 0 0 0 0 6.663 3.333 3.333 0 0 0 0 6.665 3.333 3.333 0 1 0 3.332-3.332V8.668h3.332Z"/>
    <circle cx="15.332" cy="12.001" r="3.332"/>
  </svg>
);

const CanvaIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
  </svg>
);

const QuickBooksIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4-13h-3V5h-2v2H8v2h3v6h2V9h3V7z"/>
  </svg>
);

const XeroIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6L12 10.5 8.5 8 12 5.5 15.5 8zM8 12l2.5 2.5L8 17l-2.5-2.5L8 12zm8 0l2.5 2.5L16 17l-2.5-2.5L16 12zm-4 2.5L8.5 16 12 18.5 15.5 16 12 14.5z"/>
  </svg>
);

const StripeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z"/>
  </svg>
);

const PayPalIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a.3.3 0 0 0 .029-.007c.942-.382 1.55-1.17 1.717-2.22.167-1.05-.108-2.061-.777-2.85-.669-.789-1.673-1.18-2.835-1.18H5.998c-.524 0-.968.382-1.05.9L1.841 21.262a.641.641 0 0 0 .633.74h4.607l1.12-7.106c.082-.518.526-.9 1.05-.9h2.19c4.298 0 7.664-1.747 8.647-6.797.03-.149.054-.294.077-.437.133-.85.108-1.7-.246-2.414z"/>
  </svg>
);

const PowerBIIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M1 22h4V10H1v12zm6-18h4v18H7V4zm6 8h4v10h-4V12zm6-6h4v16h-4V6z"/>
  </svg>
);

const TableauIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.654 3.067v2.756H9.05V7.44h2.604v2.756h1.692V7.44h2.604V5.823h-2.604V3.067h-1.692zM20.438 8.598v1.684h-1.595v1.107h1.595v1.684h1.084v-1.684H23.1v-1.107h-1.578V8.598h-1.084z"/>
  </svg>
);

const ExcelIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M5.616 20.384h12.768V3.616H5.616v16.768zM7.308 5.308h9.384v1.692H7.308V5.308zm0 3.384h9.384v1.692H7.308V8.692zm0 3.384h9.384v1.692H7.308v-1.692zm0 3.384h9.384v1.692H7.308v-1.692z"/>
  </svg>
);

const NotionIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466l1.823 1.447zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.746c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233c.747 0 .934.187 1.401.933l4.9 7.514v-6.119l-1.026-.12c-.093-.514.28-.887.793-.933l3.082-.187z"/>
  </svg>
);

const AsanaIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0C9.33 11 10 10.33 10 9.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 1.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"/>
  </svg>
);

const MondayIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
  </svg>
);

const SlackIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
  </svg>
);

const HubSpotIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.164 7.93V4.495a3.5 3.5 0 1 0-2.5 0V7.93a6.5 6.5 0 1 0 2.5 0zm-1.25 8.57a4 4 0 1 1-4-4 4 4 0 0 1 4 4z"/>
  </svg>
);

const ZapierIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.066 17.894H16.93l-1.406-1.406-3.524.001L9.495 18h-1.43l2.505-2.505.001-3.524L8.106 9.466V8.03l1.406-1.406 3.524-.001L15.541 5h1.431l-2.505 2.505-.001 3.524 2.505 2.505z"/>
  </svg>
);

const MakeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0C9.33 11 10 10.33 10 9.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 1.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"/>
  </svg>
);

const GitHubIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

const NextJSIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747C23.197 4.249 20.16.751 16.047.202a25.013 25.013 0 0 0-4.475-.202zm3.66 5.5a.471.471 0 0 1 .233.194c.043.06.043.089.043 4.726 0 2.57-.007 4.654-.015 4.632-.008-.021-1.177-1.823-2.597-4.007s-2.591-3.982-2.591-4.007c0-.018.857-.033 1.904-.033 1.787 0 1.914.006 2.023.095z"/>
  </svg>
);

const VercelIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 1L24 22H0L12 1z"/>
  </svg>
);

const FirebaseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M5.803 21.634L18.197 21.634L19.045 8.366L13.636 2.957L12 4.593L10.364 2.957L4.955 8.366L5.803 21.634Z"/>
  </svg>
);

const TailwindIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zM6.001 12c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
  </svg>
);

// ACCESOS ESPECIALES IMPULSA LAB
const HerramientasIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
  </svg>
);

const AgentesIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

const DiagnosticoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
  </svg>
);

const NoticiasIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
  </svg>
);

// ARSENAL TECNOLÓGICO EXPANDIDO CON ACCESOS ESPECIALES
const techTools: TechTool[] = [
  // ACCESOS ESPECIALES IMPULSA LAB (PRIMEROS EN LAS CINTAS)
  { name: 'Herramientas', logo: HerramientasIcon, url: '/herramientas', category: 'Impulsa Lab', keywords: ['herramientas', 'arsenal', 'tecnologia', 'productividad'] },
  { name: 'Agentes IA', logo: AgentesIcon, url: '/agentes', category: 'Impulsa Lab', keywords: ['agentes', 'ia', 'automatizacion', 'asistentes'] },
  { name: 'Diagnóstico 3D', logo: DiagnosticoIcon, url: '/diagnostico', category: 'Impulsa Lab', keywords: ['diagnostico', 'analisis', 'evaluacion', 'negocio'] },
  { name: 'Noticias IA', logo: NoticiasIcon, url: '/noticias-ia', category: 'Impulsa Lab', keywords: ['noticias', 'ia', 'tendencias', 'actualidad'] },

  // IA
  { name: 'ChatGPT', logo: ChatGPTIcon, url: 'https://chat.openai.com', category: 'IA', keywords: ['ia', 'inteligencia artificial', 'chat', 'texto', 'conversacion'] },
  { name: 'Claude', logo: ClaudeIcon, url: 'https://claude.ai', category: 'IA', keywords: ['ia', 'inteligencia artificial', 'asistente', 'analisis', 'codigo'] },
  { name: 'Gemini', logo: GeminiIcon, url: 'https://gemini.google.com', category: 'IA', keywords: ['ia', 'google', 'inteligencia artificial', 'busqueda', 'analisis'] },
  { name: 'Grok', logo: GrokIcon, url: 'https://grok.x.ai', category: 'IA', keywords: ['ia', 'inteligencia artificial', 'twitter', 'x', 'tiempo real'] },
  { name: 'Google AI', logo: GoogleAIIcon, url: 'https://ai.google', category: 'IA', keywords: ['ia', 'google', 'machine learning', 'desarrollo', 'api'] },
  { name: 'Perplexity', logo: PerplexityIcon, url: 'https://perplexity.ai', category: 'IA', keywords: ['ia', 'busqueda', 'investigacion', 'respuestas', 'fuentes'] },
  { name: 'Midjourney', logo: MidjourneyIcon, url: 'https://midjourney.com', category: 'IA', keywords: ['ia', 'imagenes', 'arte', 'generacion', 'diseño'] },

  // DISEÑO Y CREATIVIDAD
  { name: 'Figma', logo: FigmaIcon, url: 'https://figma.com', category: 'Diseño', keywords: ['diseño', 'ui', 'ux', 'prototipo', 'colaboracion'] },
  { name: 'Canva', logo: CanvaIcon, url: 'https://canva.com', category: 'Diseño', keywords: ['diseño', 'graficos', 'marketing', 'plantillas', 'logo'] },

  // FINANZAS Y CONTABILIDAD
  { name: 'QuickBooks', logo: QuickBooksIcon, url: 'https://quickbooks.com', category: 'Finanzas', keywords: ['finanzas', 'contabilidad', 'facturacion', 'impuestos', 'pymes'] },
  { name: 'Xero', logo: XeroIcon, url: 'https://xero.com', category: 'Finanzas', keywords: ['finanzas', 'contabilidad', 'cloud', 'integracion', 'reportes'] },
  { name: 'Stripe', logo: StripeIcon, url: 'https://stripe.com', category: 'Finanzas', keywords: ['pagos', 'ecommerce', 'api', 'procesamiento', 'online'] },
  { name: 'PayPal', logo: PayPalIcon, url: 'https://paypal.com', category: 'Finanzas', keywords: ['pagos', 'transferencias', 'ecommerce', 'seguridad', 'global'] },

  // ANÁLISIS Y DATOS
  { name: 'Power BI', logo: PowerBIIcon, url: 'https://powerbi.microsoft.com', category: 'Análisis', keywords: ['datos', 'business intelligence', 'reportes', 'dashboards', 'microsoft'] },
  { name: 'Tableau', logo: TableauIcon, url: 'https://tableau.com', category: 'Análisis', keywords: ['datos', 'visualizacion', 'analytics', 'reportes', 'insights'] },
  { name: 'Excel', logo: ExcelIcon, url: 'https://office.microsoft.com/excel', category: 'Análisis', keywords: ['hojas de calculo', 'datos', 'finanzas', 'formulas', 'microsoft'] },

  // GESTIÓN DE NEGOCIOS
  { name: 'Notion', logo: NotionIcon, url: 'https://notion.so', category: 'Gestión', keywords: ['organizacion', 'notas', 'base de datos', 'colaboracion', 'productividad'] },
  { name: 'Asana', logo: AsanaIcon, url: 'https://asana.com', category: 'Gestión', keywords: ['gestion de proyectos', 'tareas', 'equipos', 'colaboracion', 'productividad'] },
  { name: 'Monday', logo: MondayIcon, url: 'https://monday.com', category: 'Gestión', keywords: ['gestion de proyectos', 'flujo de trabajo', 'equipos', 'automatizacion'] },
  { name: 'Slack', logo: SlackIcon, url: 'https://slack.com', category: 'Gestión', keywords: ['comunicacion', 'equipos', 'chat', 'integracion', 'colaboracion'] },
  { name: 'HubSpot', logo: HubSpotIcon, url: 'https://hubspot.com', category: 'Gestión', keywords: ['crm', 'marketing', 'ventas', 'automatizacion', 'clientes'] },

  // AUTOMATIZACIÓN
  { name: 'Zapier', logo: ZapierIcon, url: 'https://zapier.com', category: 'Automatización', keywords: ['automatizacion', 'integracion', 'workflows', 'conectores', 'productividad'] },
  { name: 'Make', logo: MakeIcon, url: 'https://make.com', category: 'Automatización', keywords: ['automatizacion', 'integracion', 'api', 'workflows', 'no-code'] },

  // DESARROLLO
  { name: 'GitHub', logo: GitHubIcon, url: 'https://github.com', category: 'Desarrollo', keywords: ['codigo', 'repositorios', 'colaboracion', 'version control', 'desarrollo'] },
  { name: 'Next.js', logo: NextJSIcon, url: 'https://nextjs.org', category: 'Desarrollo', keywords: ['react', 'framework', 'web', 'full-stack', 'javascript'] },
  { name: 'Vercel', logo: VercelIcon, url: 'https://vercel.com', category: 'Desarrollo', keywords: ['hosting', 'deploy', 'nextjs', 'frontend', 'jamstack'] },
  { name: 'Firebase', logo: FirebaseIcon, url: 'https://firebase.google.com', category: 'Desarrollo', keywords: ['backend', 'base de datos', 'auth', 'hosting', 'google'] },
  { name: 'Tailwind', logo: TailwindIcon, url: 'https://tailwindcss.com', category: 'Desarrollo', keywords: ['css', 'framework', 'utility', 'diseño', 'responsive'] },
];

const VerticalTechTicker: React.FC = () => {
  return (
    <div className="flex flex-row gap-4 overflow-hidden">
      {/* CINTA IZQUIERDA */}
      <div className="flex flex-col animate-slide-up gap-3">
        {[...techTools.slice(0, 15), ...techTools.slice(0, 15)].map((tool, index) => (
          <a
            key={`left-${index}`}
            href={tool.url}
            target={tool.url.startsWith('/') ? '_self' : '_blank'}
            rel={tool.url.startsWith('/') ? undefined : 'noopener noreferrer'}
            className="group flex items-center justify-center w-16 h-16 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700 hover:border-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
            title={tool.name}
          >
            <tool.logo className="w-8 h-8 text-slate-400 group-hover:text-cyan-500 transition-colors duration-300" />
          </a>
        ))}
      </div>

      {/* CINTA DERECHA */}
      <div className="flex flex-col animate-slide-down gap-3">
        {[...techTools.slice(15, 30), ...techTools.slice(15, 30)].map((tool, index) => (
          <a
            key={`right-${index}`}
            href={tool.url}
            target={tool.url.startsWith('/') ? '_self' : '_blank'}
            rel={tool.url.startsWith('/') ? undefined : 'noopener noreferrer'}
            className="group flex items-center justify-center w-16 h-16 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700 hover:border-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
            title={tool.name}
          >
            <tool.logo className="w-8 h-8 text-slate-400 group-hover:text-cyan-500 transition-colors duration-300" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default VerticalTechTicker;