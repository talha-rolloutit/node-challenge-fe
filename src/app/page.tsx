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
import ReactPaginate from "react-paginate";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/badge";
import { useGetPhotos } from "@/hooks/queries/use-get-photos";
import { useGetTopTags } from "@/hooks/queries/use-get-top-tags";
import { useDeletePhoto } from "@/hooks/mutations/use-delete-photo";
import { Pet } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

export default function Home() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const limit = searchParams.get("limit") ?? "10";
  const tagId = searchParams.get("tagId") ?? "";

  const photos = useGetPhotos({
    page: Number(page),
    limit: Number(limit),
    tagId,
  });
  const pageCount = Math.ceil(
    (photos.data?.meta?.total ?? 0) / (photos.data?.meta?.limit ?? 1)
  );

  const topTags = useGetTopTags();

  return (
    <main className="container mx-auto py-4 space-y-4">
      <div className="flex flex-wrap gap-6">
        {topTags.data?.map((tag) => (
          <Badge
            key={tag.id}
            className={cn(
              "cursor-pointer",
              tagId === tag.id
                ? "bg-primary"
                : "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
            )}
            onClick={() => {
              router.push(`/?page=1&limit=10&tagId=${tag.id}`);
            }}
          >
            {tag.name}
          </Badge>
        ))}
      </div>

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
            <Row key={photo.id} photo={photo} />
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>
              <ReactPaginate
                breakLabel="..."
                nextLabel="Next >"
                onPageChange={(event) => {
                  router.push(
                    `/?page=${event.selected + 1}&limit=${limit}&tagId=${tagId}`
                  );
                }}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< Previous"
                renderOnZeroPageCount={null}
                className="flex justify-evenly"
                activeClassName="bg-primary text-primary-foreground min-w-[30px] text-center rounded"
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </main>
  );
}

function Row({ photo }: { photo: Pet }) {
  const qc = useQueryClient();
  const deletePhoto = useDeletePhoto();

  const onDeletePhoto = () => {
    deletePhoto.mutate(photo.id, {
      onSettled: () => {
        qc.invalidateQueries({
          queryKey: ["PHOTOS"],
        });
      },
    });
  };

  return (
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
        <button
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
          onClick={onDeletePhoto}
          disabled={deletePhoto.isPending}
        >
          {deletePhoto.isPending ? "Deleting..." : "Delete"}
        </button>
      </TableCell>
    </TableRow>
  );
}
