import { useState, useMemo } from "react";
import { SectorList } from "../components/SectorList";
import { Trash2Icon, FilterIcon, SearchIcon } from "lucide-react";

import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { useSectors } from "../hooks/sectors/use-sectors-getall";

export default function SectorCreate() {
  const { sectors, loading, erro } = useSectors();

  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return sectors.filter((s) => {
      const matchesSearch =
        s.sector_name.toLowerCase().includes(search.toLowerCase()) ||
        s.SectorID.toString().includes(search);
      return matchesSearch;
    });
  }, [sectors, search]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground text-left">
            Sectors
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage and track all sectors.
          </p>
        </div>
      </div>

        <div className="flex flex-wrap items-center gap-3 rounded-lg border border-border bg-card p-4">
          <FilterIcon className="h-4 w-4 text-muted-foreground" />
          <div className="relative flex-1 min-w-50">
            <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Table */}
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/50">
                <TableHead className="w-10">ID</TableHead>
                <TableHead className="w-10">Sector</TableHead>
                <TableHead className="w-30 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={2}
                    className="text-center text-muted-foreground"
                  >
                    {sectors.length === 0
                      ? "No samples registered yet."
                      : "No samples match the current filters."}
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((sector) => (
                  <TableRow
                    key={sector.id_sector}
                    className="h-1 hover:bg-secondary/30"
                  >
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      #{sector.SectorID}
                    </TableCell>
                    <TableCell className="font-medium">
                      {sector.sector_name}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" asChild>
                        <Link to={`/`}>
                          <Trash2Icon className="h-4 w-4" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
    </div>
  );
}
