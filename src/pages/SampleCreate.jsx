import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { useState } from "react";
import { ArrowLeftIcon } from "lucide-react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { SECTORS, ANALYSES } from "../types/samples-type";


function SampleCreate() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [sector, setSector] = useState("");
  const [selectedAnalyses, setSelectedAnalyses] = useState([]);

  const toggleAnalysis = (analysis) => {
    setSelectedAnalyses((prev) =>
      prev.includes(analysis)
        ? prev.filter((a) => a !== analysis)
        : [...prev, analysis],
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !sector || selectedAnalyses.length === 0) {
      toast.error("Please fill in all required fields.");
      return;
    }
    toast.success("Sample created successfully!");
    navigate("/");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
          <ArrowLeftIcon className="h-4 w-4" />
        </Button>
        <div className="text-left">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            New Sample
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Register a new laboratory sample.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-lg border bg-card p-6"
      >
        <div className="space-y-2 text-left">
          <Label htmlFor="name">Sample Name *</Label>
          <Input
            id="name"
            placeholder="e.g. Blood Culture A-2024"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Sector *</Label>
          <Select value={sector} onValueChange={setSector}>
            <SelectTrigger>
              <SelectValue placeholder="Select a sector" />
            </SelectTrigger>
          </Select>
        </div>


      </form>
    </div>
  );
}

export default SampleCreate;
