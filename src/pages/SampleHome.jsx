import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { PlusIcon } from "lucide-react";
import { SamplesList } from "../components/SampleList";

function SampleHome() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="text-left">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Samples
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage and track all laboratory samples.
          </p>
        </div>
        <Button asChild>
          <Link to="/samples/new">
            <PlusIcon className="h-4 w-4"/>
            New Sample
          </Link>
        </Button>
      </div>

      <SamplesList />

    </div>
  );
}

export default SampleHome;
