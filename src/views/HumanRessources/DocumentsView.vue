<script setup lang="ts">
</script>
<template>
  <div class="flex-grow-1 container-fluid mt-3">
    <h5 class="py-3 mb-4 fw-medium text-muted">Dashboard / <span class="text-dark">Documents</span> </h5>
    <div class="card shadow-none mb-4">
      <div class="card-header d-flex flex-wrap justify-content-between gap-3">
        <div class="card-title mb-0 me-1">
          <h5 class="mb-1">Documents</h5>
          <p class="text-muted mb-0">Tous les documents des employés</p>
        </div>
        <div class="d-flex justify-content-md-end align-items-center gap-3 flex-wrap">

        </div>
      </div>
      <div class="card-body">
        <div class="row gy-4 mb-4">
          <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
            <div class="card p-2 h-100 shadow-none border">
              <div class="card-body p-3 pt-2">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <small class="badge bg-label-primary fw-bold">PDF</small>
                  <small class="d-flex align-items-center justify-content-between fw-bold text-muted gap-1 mb-0 ms-auto">
                    <i class="ti ti-clock"></i> 2024-01-02
                  </small>
                  <div class="dropdown ms-2">
                    <button class="btn p-0" type="button" id="topCourses" data-bs-toggle="dropdown" aria-haspopup="true"
                      aria-expanded="false">
                      <i class="ti ti-dots-vertical"></i>
                    </button>
                    <div class="dropdown-menu dropdown-menu-end" aria-labelledby="topCourses" style="">
                      <a class="dropdown-item" href="javascript:void(0);">Télécharger</a>
                      <a class="dropdown-item text-danger" href="javascript:void(0);">Supprimer</a>
                    </div>
                  </div>
                </div>
                <a href="app-academy-course-details.html" class="h5 mb-3">Basics of Angular</a>
                <small class="d-block mt-3 mb-1"> <i class="ti ti-chevron-right"></i> Employe : Ayoub Chahid </small>
                <small class="mt-1 mb-1"> <i class="ti ti-chevron-right"></i> Marticule : Ayoub Chahid </small>
              </div>
            </div>
          </div>
        </div>
        <nav aria-label="Page navigation" class="d-flex align-items-center justify-content-center">
          <ul class="pagination">
            <li class="page-item prev">
              <a class="page-link waves-effect" href="javascript:void(0);"><i
                  class="ti ti-chevron-left ti-xs scaleX-n1-rtl"></i></a>
            </li>
            <li class="page-item active">
              <a class="page-link waves-effect" href="javascript:void(0);">1</a>
            </li>
            <li class="page-item">
              <a class="page-link waves-effect" href="javascript:void(0);">2</a>
            </li>
            <li class="page-item">
              <a class="page-link waves-effect" href="javascript:void(0);">3</a>
            </li>
            <li class="page-item">
              <a class="page-link waves-effect" href="javascript:void(0);">4</a>
            </li>
            <li class="page-item">
              <a class="page-link waves-effect" href="javascript:void(0);">5</a>
            </li>
            <li class="page-item next">
              <a class="page-link waves-effect" href="javascript:void(0);"><i
                  class="ti ti-chevron-right ti-xs scaleX-n1-rtl"></i></a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
