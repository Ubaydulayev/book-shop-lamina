import { Button, TextField } from "@mui/material";
import { useDebounce } from "hooks";
import { get } from "lodash";
import Container from "modules";
import { useState } from "react";
import Create from "./create";
import Update from "./update";
import Delete from "./delete";

interface TBook {
  isbn: string;
  id: number;
  author: string;
  cover: string;
  title: string;
  published: number;
  status: number;
  book: TBook;
}
const Books = () => {
  const [modal, setModal] = useState<{
    create: boolean;
    update: boolean;
    delete: boolean;
    data: { [key: string]: any };
  }>({
    create: false,
    update: false,
    delete: false,
    data: {},
  });

  const [search, setSearch] = useState<string>("");
  const searchValue = useDebounce(search, 1000);
  const bookStatuses = {
    0: "New",
    1: "Reading",
    2: "Finish",
  };
  return (
    <div className="container p-5">
      <div className="flex justify-between sticky top-0 p-5 bg-white z-20">
        <div>
          <TextField
            name="search"
            onChange={(e) => setSearch(e.target.value)}
            className="w-[400px]"
            label="Search"
          />
        </div>
        <Button
          onClick={() => setModal({ ...modal, create: true })}
          variant="contained"
        >
          Create book
        </Button>
      </div>

      <Container.All
        url={`/books${searchValue ? `/${searchValue}` : ""}`}
        name="books"
      >
        {({ items, isLoading }) => {
          const data: TBook[] = items as TBook[];
          const booksMapper = (books: TBook[]) => {
            if (books?.length)
              return books.map((item, index) => {
                return {
                  ...item.book,
                  status: item.status,
                  author: item.author ?? undefined,
                  isbn: item?.isbn ?? item.book.isbn ?? "",
                  title: item?.title ?? undefined,
                  cover:
                    item?.cover ??
                    "https://as2.ftcdn.net/jpg/03/34/50/49/1024W_F_334504908_e1zuE0BdikLGtzyiHgHFsAtimGMDu6EO_NW1.jpg",
                  id: item?.book?.id,
                  published: item.published ?? undefined,
                };
              });
            return [];
          };

          return (
            <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-8 py-5">
              {isLoading
                ? "Loading..."
                : booksMapper(data).length
                ? booksMapper(data)?.map((item, index) => (
                    <div key={item.isbn} className="shadow relative group">
                      <div className="relative pb-[90%]">
                        <img
                          className="w-full h-full object-cover absolute left-0 top-0 "
                          src={item.cover}
                          alt={item?.isbn}
                        />
                      </div>
                      <div className="mt-4 p-4">
                        <div>
                          <span className="font-medium">Author:</span>{" "}
                          {get(item, "author", "Not available")}
                        </div>
                        <div>
                          <span className="font-medium">Title:</span>{" "}
                          {get(item, "title", "Not available")}
                        </div>
                        <div>
                          <span className="font-medium">Published:</span>{" "}
                          {get(item, "published", "Not available")}
                        </div>
                        <div>
                          <span className="font-medium">ISBN:</span>{" "}
                          {get(item, "isbn", "Not available")}
                        </div>
                        <div>
                          <span className="font-medium">Status:</span>{" "}
                          {get(bookStatuses, item.status, "Not available")}
                        </div>
                      </div>
                      {!searchValue && (
                        <div className="absolute group-hover:flex hidden top-0 left-0 w-full h-full bg-[rgba(243,244,246,0.5)]  items-center justify-center gap-4 ">
                          <div
                            onClick={() =>
                              setModal({ ...modal, update: true, data: item })
                            }
                            className="text-white bg-blue-500 w-[60px] h-[60px] flex items-center justify-center rounded-full cursor-pointer"
                          >
                            Edit
                          </div>
                          <div
                            className="text-white bg-red-500 w-[60px] h-[60px] flex items-center justify-center rounded-full cursor-pointer"
                            onClick={() =>
                              setModal({ ...modal, delete: true, data: item })
                            }
                          >
                            Delete
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                : "No data"}
            </div>
          );
        }}
      </Container.All>

      <Create
        isOpen={modal.create}
        handleCancel={() => setModal({ ...modal, create: false })}
      />
      <Update
        isOpen={modal.update}
        handleCancel={() => setModal({ ...modal, update: false, data: {} })}
        data={modal.data}
      />
      <Delete
        isOpen={modal.delete}
        handleCancel={() => setModal({ ...modal, delete: false, data: {} })}
        data={modal.data}
      />
    </div>
  );
};

export default Books;
