<script lang="ts" setup>
import { onMounted, onBeforeUnmount } from 'vue';
import {
    LogoutModal, LeaveRequestCanva, RemoteRequestCanva, AbsenceRequestCanva, SalaryAdvanceRequestCanva
} from '@/ui';

let menu = document.getElementById('menu');

const toggleMenu = () => {
    menu = document.getElementById('menu');
    menu?.classList.toggle('show');
};

const onClickOutside = (event: MouseEvent) => {
    let element = event.target as HTMLElement;
    while (element && !element.id && element.parentElement) {
        element = element.parentElement;
    }
    if (element.id != 'menu-button-id') {
        menu?.classList.remove('show');
    } if (element.id == 'menu-button-id' || element.id == 'floating-btn') {
        menu?.classList.add('show');
    }
};

onMounted(() => {
    menu = document.getElementById('menu');
    document.addEventListener('click', onClickOutside);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', onClickOutside);
});

</script>

<template>
    <div>
        <div class="floating-menu">
            <button class="floating-btn" id="floating-btn" @click="toggleMenu">
                <i class="ti ti-category" id="menu-button-id"></i>
            </button>
            <ul class="menu" id="menu">
                <li>
                    <button class="btn btn-menu btn-lg shadow-none" type="button" data-bs-toggle="offcanvas"
                        data-bs-target="#requestLeave" aria-controls="requestLeave">
                        <div class="d-flex justify-content-between align-items-center me-auto">
                            <i class="ti ti-plane-inflight me-2 mb-0 mt-0"></i>
                            <small class="mt-0 mb-0">
                                Demande de congé
                            </small>
                        </div>
                        <div class="text-primary ms-auto mt-0 mb-0">
                            <i class="ti ti-chevron-right m-auto"></i>
                        </div>
                    </button>
                </li>
                <li>
                    <button class="btn btn-menu btn-lg shadow-none" type="button" data-bs-toggle="offcanvas"
                        data-bs-target="#requestRemotly" aria-controls="requestRemotly">
                        <div class="d-flex justify-content-between align-items-center me-auto">
                            <i class="ti ti-home-cog me-2 mb-0 mt-0"></i>
                            <small class="mt-0 mb-0">
                                Demande de télétravail
                            </small>
                        </div>
                        <div class="text-primary ms-auto mt-0 mb-0">
                            <i class="ti ti-chevron-right m-auto"></i>
                        </div>
                    </button>
                </li>
                <li>
                    <button class="btn btn-menu btn-lg shadow-none" type="button" data-bs-toggle="offcanvas"
                        data-bs-target="#requestAbsent" aria-controls="requestAbsent">
                        <div class="d-flex justify-content-between align-items-center me-auto">
                            <i class="ti ti-calendar-off me-2 mb-0 mt-0"></i>
                            <small class="mt-0 mb-0">
                                Demande d'absence
                            </small>
                        </div>
                        <div class="text-primary ms-auto mt-0 mb-0">
                            <i class="ti ti-chevron-right m-auto"></i>
                        </div>
                    </button>
                </li>
                <li>
                    <button class="btn btn-menu btn-lg shadow-none" type="button" data-bs-toggle="offcanvas"
                        data-bs-target="#salaryAdvanceRequest" aria-controls="requestAbsent">
                        <div class="d-flex justify-content-between align-items-center me-auto">
                            <i class="ti ti-coins me-2 mb-0 mt-0"></i>
                            <small class="mt-0 mb-0">
                                Demande d'avance sur salaire
                            </small>
                        </div>
                        <div class="text-primary ms-auto mt-0 mb-0">
                            <i class="ti ti-chevron-right m-auto"></i>
                        </div>
                    </button>
                </li>
                <li>
                    <button class="btn btn-menu btn-lg shadow-none" type="button" data-bs-toggle="modal"
                        data-bs-target="#logout-modal" aria-controls="logoutModal">
                        <div class="d-flex justify-content-between align-items-center me-auto">
                            <i class="ti ti-power me-2 mb-0 mt-0"></i>
                            <small class="mt-0 mb-0">
                                Se déconnecter
                            </small>
                        </div>
                        <div class="text-primary ms-auto mt-0 mb-0">
                            <i class="ti ti-chevron-right m-auto"></i>
                        </div>
                    </button>
                </li>
            </ul>
        </div>
        <LeaveRequestCanva />
        <RemoteRequestCanva />
        <AbsenceRequestCanva />
        <SalaryAdvanceRequestCanva />
        <LogoutModal />
    </div>
</template>

<style>
.btn-menu {
    color: #0B4B71 !important;
    border: none;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    width: 100%;
    font-weight: 500;
    height: 50px;
}

.floating-menu {
    position: fixed;
    bottom: 5%;
    right: 40px;
    z-index: 100;
}

.floating-btn {
    width: 60px;
    height: 60px;
    border: none;
    border-radius: 50%;
    background-color: #0B4B71;
    color: white;
    font-size: 24px;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.floating-btn:focus {
    outline: none;
}

.floating-btn:hover,
.menu a:hover {
    background-color: #0056b3;
}

.menu {
    list-style: none;
    padding: 0;
    margin: 0;
    display: none;
    /* Hidden by default */
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    position: absolute;
    right: 0;
    top: -20px;
    transform: translateY(-100%);
    width: 270px;
    /* Fixed width for the menu */
}

.menu.show {
    display: block;
    /* Show the menu */
}

.menu li a {
    display: block;
    padding: 10px 20px;
    text-decoration: none;
    color: black;
    white-space: nowrap;
}

.menu li {
    border-bottom: 1px solid #eee;
}

.menu li:last-child {
    border-bottom: none;
}
</style>