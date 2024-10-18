import "./FolderNotch.css";

export default function FolderNotch({ className = "" }: FolderNotchProps) {
  return (
    <div className={`${className}`}>
      <svg width="100%" height="100%" style={{"overflow":"visible"}} preserveAspectRatio="none" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 6.25L7.66641 8C7.55822 8.08114 7.42664 8.125 7.29141 8.125H2.5V5C2.5 4.83424 2.56585 4.67527 2.68306 4.55806C2.80027 4.44085 2.95924 4.375 3.125 4.375H7.29141C7.42664 4.375 7.55822 4.41886 7.66641 4.5L10 6.25Z" fill="#1C1C1C" fill-opacity="0.1"/>
      <path d="M16.875 5.625H10.2086L8.04141 4C7.82472 3.83832 7.56176 3.75067 7.29141 3.75H3.125C2.79348 3.75 2.47554 3.8817 2.24112 4.11612C2.0067 4.35054 1.875 4.66848 1.875 5V15.625C1.875 15.9565 2.0067 16.2745 2.24112 16.5089C2.47554 16.7433 2.79348 16.875 3.125 16.875H16.875C17.2065 16.875 17.5245 16.7433 17.7589 16.5089C17.9933 16.2745 18.125 15.9565 18.125 15.625V6.875C18.125 6.54348 17.9933 6.22554 17.7589 5.99112C17.5245 5.7567 17.2065 5.625 16.875 5.625ZM3.125 5H7.29141L8.95859 6.25L7.29141 7.5H3.125V5ZM16.875 15.625H3.125V8.75H7.29141C7.56176 8.74933 7.82472 8.66168 8.04141 8.5L10.2086 6.875H16.875V15.625Z" fill="#1C1C1C"/>
      </svg>
      
    </div>
  );
}

interface FolderNotchProps {
  className?: string;
}
