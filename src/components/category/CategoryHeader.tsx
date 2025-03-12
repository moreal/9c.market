type CategoryHeaderProps = {
  title: string;
};

export default function CategoryHeader(props: CategoryHeaderProps) {
  return (
    <div class="flex items-center mb-6">
      <div class="bg-gradient-to-r from-sky-600 to-indigo-600 h-8 w-1 mr-3 rounded"></div>
      <h2 class="text-2xl font-bold text-white-800">{props.title}</h2>
      <div class="ml-4 h-0.5 flex-grow bg-gradient-to-r from-gray-300 to-gray-100 rounded-full"></div>
    </div>
  );
}
