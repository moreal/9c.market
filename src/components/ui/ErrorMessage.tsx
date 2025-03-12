import Button from "./Button";

type ErrorMessageProps = {
  message: string;
  retryAction?: () => void;
};

export default function ErrorMessage(props: ErrorMessageProps) {
  return (
    <div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center max-w-xl mx-auto">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p class="text-lg text-red-800 mb-4">{props.message}</p>
      {props.retryAction && (
        <Button 
          variant="danger"
          onClick={props.retryAction}
        >
          Retry
        </Button>
      )}
    </div>
  );
}
