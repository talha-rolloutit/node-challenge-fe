"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import Image from "next/image";
import { useGetPhotos } from "@/hooks/queries/use-get-photos";

export default function Home() {
  const photos = useGetPhotos();

  console.log(photos.data?.data);

  return (
    <main>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Publish Date</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {photos.data?.data.map((photo) => (
            <TableRow key={photo.id}>
              <TableCell>{photo.id}</TableCell>
              <TableCell>{photo.publishedAt}</TableCell>
              <TableCell>
                <Image
                  src={photo.imageUrl}
                  alt="A photo of a pet"
                  width={96}
                  height={96}
                  className="size-24"
                />
              </TableCell>
              <TableCell>
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell>$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>
    </main>
  );
}
