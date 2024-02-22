import { ref, watchEffect } from 'vue';

export function usePagination(store:any, dataRef:any, isDataReady:any) {
  const currentPage = ref(store.currentPage);
  const totalPages = ref(store.totalPages);
  const perPage = ref(store.perPage);
  const pagedData = ref([]);

  // Watch for changes in store's currentPage and perPage
  watchEffect(() => {
    currentPage.value = store.currentPage;
    perPage.value = store.perPage;

    if (isDataReady.value) {
      updateTotalPages();
      updatePagedData();
    }
  });

  // Watch for changes in perPage and update store
  watchEffect(() => {
    store.setPerPage(perPage.value);
  });

  // Watch for changes in currentPage and update pagedData
  watchEffect(() => {
    if (isDataReady.value) {
      updatePagedData();
    }
  });

  // Pagination logic
  const nextPage = () => {
    // store.setCurrentPage(currentPage.value + 1);
    if (currentPage.value < totalPages.value) {
            store.setCurrentPage(currentPage.value + 1);
        updatePagedData();
    }
  };

  const prevPage = () => {
    // store.setCurrentPage(currentPage.value - 1);
    if (currentPage.value > 1) {
        store.setCurrentPage(currentPage.value - 1)
        updatePagedData();
    }
  };

  const updatePerPage = () => {
    store.setPerPage(parseInt(perPage.value));
    // pagedData.value = pagedData.value.slice(0, perPage.value);

  };

  const handlePagination = (page) => {
    store.setCurrentPage(page);
  };

function updateTotalPages() {
    totalPages.value = Math.ceil(dataRef.value.length / store.perPage);
}

function updatePagedData() {
    const start = (store.currentPage - 1) * store.perPage;
    const end = start + store.perPage;
    pagedData.value = dataRef.value.slice(start, end);
}
function updateData(data) {
  pagedData.value = data;
}



  
  

  return {
    currentPage,
    totalPages,
    perPage,
    nextPage,
    prevPage,
    pagedData,
    updatePerPage,
    handlePagination,
    updateData
  };
}
