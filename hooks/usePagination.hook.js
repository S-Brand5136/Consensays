import { useEffect, useState } from "react";

export const usePagination = (items, rowsPerPage, page) => {
  const [currentPage, setCurrentPage] = useState(page);
  const [filterBy, setFilterBy] = useState("");
  const [currentItems, setCurrentItems] = useState(
    items.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
  );
  const maxPage = Math.ceil(items.length / rowsPerPage);

  useEffect(() => {
    switch (filterBy) {
      case "Newest":
        setCurrentItems(currentItems.sort((a, b) => a.id - b.id));
        break;
      case "Hidden Votes":
        setCurrentItems(currentItems.sort((a, b) => a.hideVotes - b.hideVotes));
        break;
      case "Oldest":
        setCurrentItems(currentItems.sort((a, b) => b.id - a.id));
        break;
      default:
        break;
    }
  }, [filterBy]);

  const searchByTitle = (searchTerm) => {
    setCurrentItems(
      currentItems.filter((item) => item.title.includes(searchTerm))
    );
  };

  const reset = () => {
    setCurrentPage(1);
    setCurrentItems(items.slice(0, rowsPerPage));
  };

  const next = () => {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
  };

  const prev = () => {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  };

  const jump = (page) => {
    const pageNumber = Math.max(1, page);
    setCurrentPage((currentPage) => Math.min(pageNumber, maxPage));
  };

  return {
    next,
    prev,
    jump,
    searchByTitle,
    reset,
    currentPage,
    currentItems,
    maxPage,
    filterBy,
    setFilterBy,
  };
};
