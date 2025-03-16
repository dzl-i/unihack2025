import useQuery from "@/hooks/useRequest";
import { Cosmograph } from "@cosmograph/react";
import { Loader } from "lucide-react";

type Node = {
  id: string;
  color: string;
};

export default function Graph({ projectId }: { projectId: string }) {
  const { data, error, isLoading } = useQuery(`/project/${projectId}/graph`);

  if ((data && data.error) || (error && !isLoading)) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        Cannot view graph right now. Please try again later.
      </div>
    );
  }

  return (
    <>
      {!isLoading ? (
        () => {
          const graphData = JSON.parse(
            data.message.replace("```json", "").replace("```", "")
          );
          const nodes = graphData.concepts;
          const links = graphData.links.map((link: [number, number]) => ({
            source: link[0],
            target: link[1],
          }));
          console.log(nodes, links);
          return (
            <Cosmograph
              nodes={nodes}
              links={links}
              nodeColor={(d: Node) => d.color}
              nodeSize={4}
              linkWidth={2}
            />
          );
        }
      ) : (
        <div className="flex justify-center items-center w-full h-full">
          <Loader className="animate-spin w-6 h-6" />
        </div>
      )}
    </>
  );
}
