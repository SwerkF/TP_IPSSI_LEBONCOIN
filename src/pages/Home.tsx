import { useGetTemplates } from "@/api/queries/TemplateQueries";
import Loader from "@/components/Loader/Loader";

const Home = () => {

  const { data, isLoading, error } = useGetTemplates();

  return (
    <div className="min-h-screen bg-gray-100 w-full flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Hello, world!</h1>
      <div className="mt-4">
        {isLoading && <Loader />}
        {error && <p>Error: {error.message}</p>}
        {data && data.data && data.data.map((template) => (
          <div key={template.id}>
            <p>{template.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
