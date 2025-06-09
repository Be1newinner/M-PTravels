"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Users,
  TrendingUp,
  Calendar,
  Package,
  Award,
  ArrowRight,
} from "lucide-react";
import DashboardLayout from "../dashboard-layout";
// import { useLeads } from "@/lib/api/leads-api";
import {
  useTotalLeadsCount,
  useLeadsTodayCount,
  useLeadsThisMonthCount,
  useRecentLeads,
} from "@/lib/api/leads-api";
import { usePackages } from "@/lib/api/packages-api";

export default function DashboardPage() {
  const { data: totalLeadsData, isLoading: isTotalLeadsLoading } =
    useTotalLeadsCount();
  const { data: leadsTodayData, isLoading: isLeadsTodayLoading } =
    useLeadsTodayCount();
  const { data: leadsThisMonthData, isLoading: isLeadsThisMonthLoading } =
    useLeadsThisMonthCount();
  const { data: recentLeadsData, isLoading: isRecentLeadsLoading } =
    useRecentLeads();
  const { data: packagesData, isLoading: isPackagesLoading } = usePackages(
    1,
    5
  );

  // console.log({
  //   totalLeadsData,
  //   isTotalLeadsLoading,
  //   leadsTodayData,
  //   isLeadsTodayLoading,
  //   leadsThisMonthData,
  //   isLeadsThisMonthLoading,
  //   recentLeadsData,
  //   isRecentLeadsLoading,
  //   packagesData,
  //   isPackagesLoading,
  // });

  // const isLoadingStats =
  //   isTotalLeadsLoading ||
  //   isLeadsTodayLoading ||
  //   isLeadsThisMonthLoading ||
  //   isPackagesLoading;

  const totalPackages = packagesData?.meta?.total || 0;

  const topPackage = packagesData?.data?.length
    ? packagesData.data.reduce(
        (prev, current) => {
          const price = "price" in prev ? Number(prev.price) : 0;
          return price > (current.price || 0) ? prev : current;
        },
        { title: "N/A" }
      )
    : { title: "N/A" };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        {/* Stats cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isTotalLeadsLoading ? (
                  <div className="h-8 w-16 animate-pulse rounded bg-muted"></div>
                ) : (
                  totalLeadsData
                )}
              </div>
              <p className="text-xs text-muted-foreground">All time leads</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Leads Today</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLeadsTodayLoading ? (
                  <div className="h-8 w-8 animate-pulse rounded bg-muted"></div>
                ) : (
                  leadsTodayData
                )}
              </div>
              <p className="text-xs text-muted-foreground">New leads today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Leads This Month
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLeadsThisMonthLoading ? (
                  <div className="h-8 w-12 animate-pulse rounded bg-muted"></div>
                ) : (
                  leadsThisMonthData
                )}
              </div>
              <p className="text-xs text-muted-foreground">Leads this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Packages
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isPackagesLoading ? (
                  <div className="h-8 w-8 animate-pulse rounded bg-muted"></div>
                ) : (
                  totalPackages
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Active tour packages
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Top Package</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-md font-bold truncate">
                {isPackagesLoading ? (
                  <div className="h-8 w-full animate-pulse rounded bg-muted"></div>
                ) : (
                  topPackage?.title
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Highest priced package
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent data */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent leads */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Leads</CardTitle>
                <CardDescription>Latest 5 leads received</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/leads">
                  View all
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {isRecentLeadsLoading ? (
                <div className="space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="h-10 animate-pulse rounded bg-muted"
                    ></div>
                  ))}
                </div>
              ) : !recentLeadsData?.length ? (
                <div className="text-center py-4 text-muted-foreground">
                  No leads found
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentLeadsData?.map((lead) => (
                      <TableRow key={lead._id}>
                        <TableCell className="font-medium">
                          {lead.name}
                        </TableCell>
                        <TableCell>{lead.email}</TableCell>
                        <TableCell>{lead.phone}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          {/* Recent packages */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Packages</CardTitle>
                <CardDescription>Latest 5 tour packages</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/packages">
                  View all
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {isPackagesLoading ? (
                <div className="space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="h-10 animate-pulse rounded bg-muted"
                    ></div>
                  ))}
                </div>
              ) : !packagesData?.data?.length ? (
                <div className="text-center py-4 text-muted-foreground">
                  No packages found
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {packagesData?.data?.slice(0, 5).map((pkg) => (
                      <TableRow key={pkg._id}>
                        <TableCell className="font-medium">
                          {pkg.title}
                        </TableCell>
                        <TableCell>
                          {pkg.price ? `₹${pkg.price}` : "N/A"}
                        </TableCell>
                        <TableCell className="truncate max-w-[200px]">
                          {pkg.description}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
