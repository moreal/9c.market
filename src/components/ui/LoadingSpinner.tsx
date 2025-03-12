type LoadingSpinnerProps = {
  message?: string;
};

export default function LoadingSpinner(props: LoadingSpinnerProps) {
  const message = props.message || "Loading...";
  
  return (
    <div class="flex justify-center items-center p-12 animate-pulse">
      <div class="text-center">
        <div class="inline-block w-12 h-12 border-4 border-sky-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p class="text-lg text-sky-800 font-medium">{message}</p>
      </div>
    </div>
  );
}
