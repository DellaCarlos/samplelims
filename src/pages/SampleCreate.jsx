import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { useState } from "react";
import { ArrowLeftIcon } from "lucide-react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Checkbox } from "../components/ui/checkbox";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "../components/ui/select";
import { ANALYSES } from "../types/analyses-type";
import { toast } from "sonner";
import { useSectors } from "../hooks/use-sectors-getall";

function SampleCreate() {
  const navigate = useNavigate();
  const { sectors, loading, erro } = useSectors();
  const [name, setName] = useState("");
  const [sector, setSector] = useState("");
  const [selectedAnalyses, setSelectedAnalyses] = useState([]);

  const toggleAnalysis = (analysis) => {
    setSelectedAnalyses((prev) =>
      prev.includes(analysis)
        ? prev.filter((a) => a !== analysis)
        : [...prev, analysis]
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
    <div className="max-w-2xl mx-auto space-y-6 text-left">
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
        <div className="space-y-2">
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
          {erro ? (
            <p className="text-sm text-destructive">Erro ao carregar setores: {erro}</p>
          ) : (
            <Select value={sector} onValueChange={setSector} disabled={loading}>
              <SelectTrigger>
                <SelectValue placeholder={loading ? "Carregando..." : "Select a sector"} />
              </SelectTrigger>
              <SelectContent>
                {sectors.map((s) => (
                  <SelectItem key={s.id_sector} value={s.sector_name}>
                    {s.sector_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        <div className="space-y-3">
          <Label>Analyses *</Label>
          <div className="grid grid-cols-2 gap-3">
            {ANALYSES.map((analysis) => (
              <label
                key={analysis}
                className="flex items-center gap-2 rounded-md border border-border p-3 cursor-pointer hover:bg-secondary/50 transition-colors has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5"
              >
                <Checkbox
                  checked={selectedAnalyses.includes(analysis)}
                  onCheckedChange={() => toggleAnalysis(analysis)}
                />
                <span className="text-sm">{analysis}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <Label>Creation Date</Label>
          <Input
            type="text"
            value={new Date().toLocaleDateString()}
            disabled
            className="bg-muted"
          />
          <p className="text-xs text-muted-foreground">
            Automatically set to today.
          </p>
        </div>

        <div className="flex gap-3 pt-4 border-t border-border">
          <Button type="submit">Create Sample</Button>
          <Button type="button" variant="outline" onClick={() => navigate("/")}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SampleCreate;