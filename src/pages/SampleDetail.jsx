import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { format } from "date-fns";
import { ArrowLeft, Pencil, Save, X } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { Checkbox } from "../components/ui/checkbox";
import { Switch } from "../components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { StatusIndicator } from "../components/StatusIndicator";
import { toast } from "sonner";
import { ANALYSES } from "../types/analyses-type";
import { useSamples } from "../hooks/samples/use-samples-getall";
import { useSectors } from "../hooks/sectors/use-sectors-getall";

export default function SampleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { samples, loading, erro } = useSamples();
  const { sectors } = useSectors();

  const sample = samples.find((s) => s.id_sample === Number(id));

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [sector, setSector] = useState("");
  const [analyses, setAnalyses] = useState([]);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (sample) {
      setName(sample.name_sample);
      setSector(sample.sector_sample);
      setAnalyses(sample.analysis_sample);
      setIsActive(sample.is_active_sample);
    }
  }, [sample]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground">
        <p className="text-sm">Loading sample...</p>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="flex items-center justify-center py-20 text-destructive">
        <p className="text-sm">Error: {erro}</p>
      </div>
    );
  }

  if (!sample) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <p className="text-lg">Sample not found.</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => navigate("/")}
        >
          Back to Samples
        </Button>
      </div>
    );
  }

  const toggleAnalysis = (a) => {
    setAnalyses((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a],
    );
  };

  const handleSave = () => {
    if (!name.trim() || !sector || analyses.length === 0) {
      toast.error("Please fill in all required fields.");
      return;
    }
    toast.success("Sample updated successfully!");
    setEditing(false);
  };

  const handleCancel = () => {
    setName(sample.name_sample);
    setSector(sample.sector_sample);
    setAnalyses(sample.analysis_sample);
    setIsActive(sample.is_active_sample);
    setEditing(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex justify-between">
        <div className="flex gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-left text-2xl font-bold tracking-tight text-foreground">
              Sample #{sample.id_sample}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              View and edit sample details.
            </p>
          </div>
        </div>
        {!editing ? (
          <Button variant="outline" onClick={() => setEditing(true)}>
            <Pencil className="h-4 w-4" />
            Edit
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button onClick={handleSave}>
              <Save className="h-4 w-4" />
              Save
            </Button>
            <Button variant="outline" onClick={handleCancel}>
              <X className="h-4 w-4" />
              Cancel
            </Button>
          </div>
        )}
      </div>

      <div className="rounded-lg border bg-card p-6 space-y-6">
        {/* Status */}
        <div className="flex justify-between rounded-md bg-secondary/40 p-2">
          <div className="flex gap-3">
            <StatusIndicator active={isActive} showLabel />
          </div>
          {editing && (
            <div className="flex gap-2">
              <Label htmlFor="active-toggle" className="text-sm">
                Active
              </Label>
              <Switch
                id="active-toggle"
                checked={isActive}
                onCheckedChange={setIsActive}
              />
            </div>
          )}
        </div>

        {/* Name */}
        <div className="text-left space-y-3">
          <Label>Sample Name</Label>
          {editing ? (
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          ) : (
            <p className="text-sm font-medium">{sample.name_sample}</p>
          )}
        </div>

        {/* Sector */}
        <div className="text-left space-y-3">
          <Label>Sector</Label>
          {editing ? (
            <Select value={sector} onValueChange={setSector}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sectors.map((s) => (
                  <SelectItem key={s.id_sector} value={s.sector_name}>
                    {s.sector_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <div>
              <Badge variant="outline">{sample.sector_sample}</Badge>
            </div>
          )}
        </div>

        {/* Analyses */}
        <div className="text-left space-y-3">
          <Label>Analyses</Label>
          {editing ? (
            <div className="grid grid-cols-2 gap-3">
              {ANALYSES.map((a) => (
                <label
                  key={a}
                  className="flex items-center gap-2 rounded-md border border-border p-3 cursor-pointer hover:bg-secondary/50 transition-colors has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary/5"
                >
                  <Checkbox
                    checked={analyses.includes(a)}
                    onCheckedChange={() => toggleAnalysis(a)}
                  />
                  <span className="text-sm">{a}</span>
                </label>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {sample.analysis_sample.map((a) => (
                <Badge key={a} variant="outline">
                  {a}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Metadata */}
        <div className="text-left grid grid-cols-2 gap-4 pt-4 border-t border-border">
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Created At</Label>
            <p className="text-sm">
              {format(
                new Date(sample.created_at_sample),
                "MMM dd, yyyy 'at' HH:mm",
              )}
            </p>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Updated At</Label>
            <p className="text-sm">
              {format(
                new Date(sample.updated_at_sample),
                "MMM dd, yyyy 'at' HH:mm",
              )}
            </p>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Created By</Label>
            <p className="text-sm font-mono">
              {sample.created_by_user_id_sample}
            </p>
          </div>
          {sample.deleted_at_sample && (
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">
                Deleted At
              </Label>
              <p className="text-sm text-destructive">
                {format(
                  new Date(sample.deleted_at_sample),
                  "MMM dd, yyyy 'at' HH:mm",
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
