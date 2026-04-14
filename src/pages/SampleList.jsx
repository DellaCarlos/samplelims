import { useState, useMemo } from "react";
import { Plus, Search, Filter, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { StatusIndicator } from "../components/StatusIndicator";
import { useSamples } from "../hooks/use-samples-getall";
import { useSectors } from "../hooks/use-sectors-getall";

export default function SampleList() {
  const { samples, loading, erro } = useSamples();
  const { sectors } = useSectors();

  const [search, setSearch] = useState("");
  const [sectorFilter, setSectorFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = useMemo(() => {
    return samples.filter((s) => {
      const matchesSearch =
        s.name_sample.toLowerCase().includes(search.toLowerCase()) ||
        s.id_sample.toString().includes(search);
      const matchesSector =
        sectorFilter === "all" || s.sector_sample === sectorFilter;
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && s.is_active_sample) ||
        (statusFilter === "inactive" && !s.is_active_sample);
      return matchesSearch && matchesSector && matchesStatus;
    });
  }, [samples, search, sectorFilter, statusFilter]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground">
        <p className="text-sm">Loading samples...</p>
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground text-left">
            Samples
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage and track all laboratory samples.
          </p>
        </div>
        <Button asChild>
          <Link to="/samples/new">
            <Plus className="h-4 w-4" />
            New Sample
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 rounded-lg border border-border bg-card p-4">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <div className="relative flex-1 min-w-50">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={sectorFilter} onValueChange={setSectorFilter}>
          <SelectTrigger className="w-45">
            <SelectValue placeholder="Sector" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sectors</SelectItem>
            {sectors.map((s) => (
              <SelectItem key={s.id_sector} value={s.sector_name}>
                {s.sector_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v)}>
          <SelectTrigger className="w-37.5">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/50">
              <TableHead className="w-15">Status</TableHead>
              <TableHead className="w-15">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Sector</TableHead>
              <TableHead>Analyses</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="w-20 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-24 text-center text-muted-foreground"
                >
                  No samples found.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((sample) => (
                <TableRow
                  key={sample.id_sample}
                  className="hover:bg-secondary/30"
                >
                  <TableCell>
                    <StatusIndicator active={sample.is_active_sample} />
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    #{sample.id_sample}
                  </TableCell>
                  <TableCell className="font-medium">
                    {sample.name_sample}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{sample.sector_sample}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {sample.analysis_sample.slice(0, 2).map((a) => (
                        <Badge key={a} variant="outline" className="text-xs">
                          {a}
                        </Badge>
                      ))}
                      {sample.analysis_sample.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{sample.analysis_sample.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {format(new Date(sample.created_at_sample), "MMM dd, yyyy")}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" asChild>
                      <Link to={`/samples/${sample.id_sample}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <p className="text-xs text-muted-foreground">
        Showing {filtered.length} of {samples.length} samples
      </p>
    </div>
  );
}
