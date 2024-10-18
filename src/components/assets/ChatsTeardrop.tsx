import "./ChatsTeardrop.css";

export default function ChatsTeardrop({ className = "" }: ChatsTeardropProps) {
  return (
    <div className={`${className}`}>
      <svg width="100%" height="100%" style={{"overflow":"visible"}} preserveAspectRatio="none" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.125 11.875V17.0312C18.125 17.1556 18.0756 17.2748 17.9877 17.3627C17.8998 17.4506 17.7806 17.5 17.6562 17.5H12.5C11.3365 17.5003 10.2016 17.1398 9.25158 16.4682C8.30154 15.7966 7.58313 14.8469 7.19531 13.75H7.5C8.99184 13.75 10.4226 13.1574 11.4775 12.1025C12.5324 11.0476 13.125 9.61684 13.125 8.12499C13.1254 7.4896 13.0179 6.85876 12.807 6.25937C14.2434 6.33789 15.5951 6.96373 16.5842 8.00822C17.5734 9.05272 18.1247 10.4365 18.125 11.875Z" fill="#1C1C1C" fill-opacity="0.1"/>
      <path d="M13.2477 5.67109C12.682 4.34684 11.6765 3.25852 10.401 2.59014C9.12553 1.92175 7.65839 1.71429 6.2476 2.00284C4.83682 2.29139 3.56895 3.05825 2.65834 4.17376C1.74773 5.28927 1.25025 6.68501 1.25 8.125V13.2812C1.25 13.5713 1.36523 13.8495 1.57035 14.0546C1.77547 14.2598 2.05367 14.375 2.34375 14.375H6.77109C7.25882 15.4888 8.06026 16.4365 9.07758 17.1024C10.0949 17.7683 11.2841 18.1236 12.5 18.125H17.6562C17.9463 18.125 18.2245 18.0098 18.4296 17.8046C18.6348 17.5995 18.75 17.3213 18.75 17.0312V11.875C18.7497 10.3471 18.1897 8.8722 17.1759 7.72909C16.1621 6.58599 14.7646 5.85387 13.2477 5.67109ZM2.5 8.125C2.5 7.13609 2.79324 6.16939 3.34265 5.34715C3.89206 4.5249 4.67295 3.88404 5.58658 3.5056C6.50021 3.12716 7.50555 3.02815 8.47545 3.22107C9.44536 3.414 10.3363 3.8902 11.0355 4.58947C11.7348 5.28873 12.211 6.17964 12.4039 7.14955C12.5969 8.11945 12.4978 9.12479 12.1194 10.0384C11.741 10.952 11.1001 11.7329 10.2779 12.2823C9.4556 12.8318 8.48891 13.125 7.5 13.125H2.5V8.125ZM17.5 16.875H12.5C11.6159 16.874 10.7477 16.6391 9.98375 16.1941C9.21976 15.7491 8.5871 15.1099 8.15 14.3414C9.00603 14.2526 9.83445 13.9878 10.5833 13.5636C11.3321 13.1394 11.9852 12.565 12.5015 11.8764C13.0178 11.1879 13.3862 10.4 13.5836 9.56235C13.7809 8.72466 13.803 7.85522 13.6484 7.00859C14.7447 7.26732 15.7216 7.88865 16.4206 8.7719C17.1197 9.65515 17.5 10.7486 17.5 11.875V16.875Z" fill="#1C1C1C"/>
      </svg>
      
    </div>
  );
}

interface ChatsTeardropProps {
  className?: string;
}
