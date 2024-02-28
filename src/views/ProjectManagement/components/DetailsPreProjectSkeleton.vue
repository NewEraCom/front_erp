<template>
    <div>
        <div class="py-3 mb-3 mt-3 skeleton-breadcums"></div>
        <div class="card">
            <div class="card-body">
                <div class="d-flex align-items-end">
                    <div class="skeleton-image"></div>
                    <div
                        class="d-flex flex-column align-items-md-end align-items-sm-start align-items-center justify-content-center mx-4 gap-4">
                        <div class="skeleton-title"></div>
                        <div class="skeleton-title"></div>
                    </div>
                    <div class="ms-auto skeleton-button"></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="skeleton-badge"></div>
            </div>
            <div class="col-4">
                <div class="skeleton-badge"></div>
            </div>
            <div class="col-4">
                <div class="skeleton-badge"></div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="card mt-4">
                    <div class="card-body">
                        <div class="skeleton-title"></div>
                        <hr />
                        <div class="row">
                            <div class="col-12">
                                <ul class="timeline pt-3">
                                    <li class="timeline-item pb-4 timeline-item-dark border-left-dashed">
                                        <span class="timeline-indicator-advanced timeline-indicator-dark">
                                            <i class="ti ti-circle-filled rounded-circle scaleX-n1-rtl"></i>
                                        </span>
                                        <div class="timeline-event">
                                            <div class="timeline-header border-bottom mb-3">
                                                <div class="skeleton-text mb-2"></div>
                                            </div>
                                            <div class="d-flex justify-content-between flex-wrap mb-2">
                                                <div class="skeleton-text mb-1"></div>
                                            </div>
                                            <div class="d-flex align-items-center">
                                                <div class="skeleton-text mb-1"></div>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="timeline-item pb-4 timeline-item-dark border-left-dashed">
                                        <span class="timeline-indicator-advanced timeline-indicator-dark">
                                            <i class="ti ti-circle-filled rounded-circle scaleX-n1-rtl"></i>
                                        </span>
                                        <div class="timeline-event">
                                            <div class="timeline-header border-bottom mb-3">
                                                <div class="skeleton-text mb-2"></div>
                                            </div>
                                            <div class="d-flex justify-content-between flex-wrap mb-2">
                                                <div class="skeleton-text mb-1"></div>
                                            </div>
                                            <div class="d-flex align-items-center">
                                                <div class="skeleton-text mb-1"></div>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="timeline-item pb-4 timeline-item-dark border-transparent">
                                        <span class="timeline-indicator-advanced timeline-indicator-dark">
                                            <i class="ti ti-circle-filled rounded-circle scaleX-n1-rtl"></i>
                                        </span>
                                        <div class="timeline-event">
                                            <div class="timeline-header border-bottom mb-3">
                                                <div class="skeleton-text mb-2"></div>
                                            </div>
                                            <div class="d-flex justify-content-between flex-wrap mb-2">
                                                <div class="skeleton-text mb-1"></div>
                                            </div>
                                            <div class="d-flex align-items-center">
                                                <div class="skeleton-text mb-1"></div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-8">
                <div class="card mt-4">
                    <div class="card-body">
                        <div class="skeleton-title"></div>
                        <hr />
                        <div class="skeleton-text mt-3"></div>
                        <div class="skeleton-text mt-3"></div>
                        <div class="skeleton-text mt-3"></div>
                        <div class="row">
                            <div class="col-6">
                                <div class="skeleton-100 mt-3"></div>
                            </div>
                            <div class="col-6">
                                <div class="skeleton-100 mt-3"></div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <div class="skeleton-100 mt-3"></div>
                            </div>
                            <div class="col-6">
                                <div class="skeleton-100 mt-3"></div>
                            </div>
                        </div>
                        <div class="skeleton-text mt-3"></div>
                        <div class="skeleton-text mt-3"></div>
                        <div class="skeleton-paragraph mt-3"></div>
                        <div class="skeleton-paragraph mt-3"></div>
                        <div class="skeleton-title mt-4"></div>
                        <hr />
                        <div class="row">
                            <div class="col-6">
                                <div class="skeleton-paragraph mt-3"></div>
                            </div>
                            <div class="col-6">
                                <div class="skeleton-paragraph mt-3"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.skeleton-breadcums {
    width: 480px;
    height: 22px;
    border-radius: 4px;
    background-color: #a7a7a7;
    animation: fadeInOut 1.5s infinite;
}

.skeleton-image {
    width: 100px;
    height: 100px;
    border-radius: 8px;
    background-color: #a7a7a7;
    animation: fadeInOut 1.5s infinite;
}

.skeleton-title {
    width: 400px;
    height: 22px;
    border-radius: 4px;
    background-color: #a7a7a7;
    animation: fadeInOut 1.5s infinite;
}

.skeleton-text {
    margin-top: 5px;
    width: 620px;
    height: 18px;
    border-radius: 4px;
    background-color: #a7a7a7;
    animation: fadeInOut 1.5s infinite;
}

.skeleton-100 {
    width: 100%;
    height: 18px;
    border-radius: 4px;
    background-color: #a7a7a7;
    animation: fadeInOut 1.5s infinite;
}

.skeleton-button {
    width: 240px;
    height: 42px;
    border-radius: 4px;
    background-color: #a7a7a7;
    animation: fadeInOut 1.5s infinite;
}

.skeleton-badge {
    margin-top: 30px;
    width: 100%;
    height: 42px;
    border-radius: 4px;
    background-color: #a7a7a7;
    animation: fadeInOut 1.5s infinite;
}

.skeleton-paragraph {
    margin-top: 30px;
    width: 100%;
    height: 122px;
    border-radius: 4px;
    background-color: #a7a7a7;
    animation: fadeInOut 1.5s infinite;
}

@keyframes fadeInOut {

    0%,
    100% {
        opacity: 0.8;
    }

    50% {
        opacity: 0.2;
    }
}
</style>