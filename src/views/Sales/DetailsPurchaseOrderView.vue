<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useSalesStore } from '@/store';
import { salesService } from '@/services';
import { formater } from '@/utils';

const salesStore = useSalesStore();

const purchase = ref(computed(() => salesStore.purchase));

onMounted(() => {
    salesService.getPurchaseOrderById(props.id);
});

const props = defineProps({
    id: {
        type: Number,
        default: 0
    }
});
</script>

<template>
    <div class="flex-grow-1 container-fluid mt-3">
        <h5 v-if="purchase" class="py-3 mb-4">
            <span class="text-muted fw-light">Dashboard /
                {{ purchase.type == 'Service' ? "Demande d'execution" : "Demande d'achat" }} /
            </span>
            {{ purchase.n_order }}
        </h5>
        <div v-if="purchase != null" class="row">
            <div class="col-12 col-lg-8">
                <div class="card card-border-shadow-primary mb-4">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h5 class="card-title m-0">Details de la demande</h5>
                        <button data-bs-target="#details-doc" data-bs-toggle="modal" class="btn btn-primary">
                            <i class="ti ti-download me-2"></i> Télécharger
                        </button>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive text-nowrap">
                            <table class="table table-striped">
                                <thead class="table-light">
                                    <tr>
                                        <th class="fw-bold">ID</th>
                                        <th class="fw-bold">Désignation</th>
                                        <th class="fw-bold text-center">Unité</th>
                                        <th class="fw-bold text-center">Quantité</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="article in purchase.purchase_article" :key="article.id">
                                        <td>{{ article.article.id }}</td>
                                        <td>{{ article.article.article }}</td>
                                        <td class="text-center">{{ article.unity }}</td>
                                        <td class="text-center">{{ article.quantity }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="card card-border-shadow-primary mb-4">
                    <div class="card-header">
                        <h5 class="card-title m-0">Historique de la demande</h5>
                    </div>
                    <div v-if="purchase.historique_purchase_order.length > 0" class="card-body m-2">
                        <ul class="timeline pt-3">
                            <li v-for="(historique, index) in purchase.historique_purchase_order" :key="historique.id"
                                :class="index === purchase.historique_purchase_order.length - 1
                                    ? 'border-transparent'
                                    : 'border-left-dashed'
                                    " class="timeline-item pb-4 timeline-item-primary">
                                <span class="timeline-indicator-advanced timeline-indicator-primary">
                                    <i class="ti ti-circle-filled"></i>
                                </span>
                                <div class="timeline-event">
                                    <div class="timeline-header border-bottom mb-3">
                                        <h6 class="mb-0">{{ historique.title }}</h6>
                                        <span class="text-muted">
                                            {{ formater.date(historique.created_at) }}
                                        </span>
                                    </div>
                                    <div class="mb-2">
                                        <div class="d-flex align-items-center">
                                            {{ historique.description }}
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div v-else class="card-body text-center m-2">
                        <img src="/src/assets/img/no_pre_project.png" class="empty_stats_img_md" alt="" />
                        <p class="mt-5 fw-bold">Aucun historique disponible</p>
                        <small class="text-muted">
                            Aucun historique n'est disponible pour cette demande
                        </small>
                    </div>
                </div>
            </div>
            <div class="col-12 col-lg-4">
                <div class="card card-border-shadow-primary mb-4">
                    <div class="card-header">
                        <h5 class="card-title m-0">Demandé par</h5>
                    </div>
                    <div class="card-body">
                        <div class="d-flex justify-content-start align-items-center mb-4">
                            <div class="avatar me-3 mt-3">
                                <i class="ti ti-user rounded-circle bg-secondary text-white p-3"></i>
                            </div>
                            <div class="d-flex flex-column">
                                <div href="app-user-view-account.html" class="text-body text-nowrap">
                                    <h6 class="mb-0">
                                        {{
                                            purchase.created_by.employee.first_name +
                                            ' ' +
                                            purchase.created_by.employee.last_name
                                        }}
                                    </h6>
                                </div>
                                <small class="text-muted">{{
                                    purchase.created_by.employee.poste
                                }}</small>
                            </div>
                        </div>
                        <h6 class="mb-2">Adresse email: {{ purchase.created_by.employee.email }}</h6>
                        <h6 class="mb-1">
                            Numéro de téléphone: {{ purchase.created_by.employee.phone ?? 'N/A' }}
                        </h6>
                    </div>
                </div>
                <div v-if="purchase.commentaire != null && purchase.commentaire != '-'"
                    class="card card-border-shadow-primary mb-4">
                    <div class="card-header">
                        <h5 class="card-title m-0">Commentaire</h5>
                    </div>
                    <div class="card-body">
                        <p class="mb-0">{{ purchase.commentaire }}</p>
                    </div>
                </div>
                <div v-if="purchase.type == 'Achats'" class="card card-border-shadow-primary mb-4">
                    <div class="card-header">
                        <h5 class="card-title m-0">Informations de livraison</h5>
                    </div>
                    <div class="card-body">
                        <div class="d-flex align-items-center">
                            <span class="badge bg-label-success rounded-circle p-2 me-2">
                                <i class="ti ti-map-pin f-18"></i>
                            </span>
                            <p class="mb-0">Adresse de livraison : {{ purchase.location }}</p>
                        </div>
                        <div v-if="purchase.location != 'Stock'" class="d-flex align-items-center mt-4">
                            <span class="badge bg-label-success rounded-circle p-2 me-2">
                                <i class="ti ti-user f-18"></i>
                            </span>
                            <p class="mb-0">Livrer à : {{ purchase.recepteur }}</p>
                        </div>
                    </div>
                </div>

                <div v-else class="card card-border-shadow-primary mb-4">
                    <div class="card-header">
                        <h5 class="card-title m-0">Informations de Soustraitant</h5>
                    </div>
                    <div class="card-body">
                        <div class="d-flex align-items-center">
                            <i class="ti ti-chevron-right f-18"></i>
                            <p class="mb-0">
                                Soustraitant :
                                {{ purchase.purchase_article[0].fournisseur.raison_social }}
                            </p>
                        </div>
                        <div class="d-flex align-items-center mt-3">
                            <i class="ti ti-chevron-right f-18"></i>
                            <p class="mb-0">
                                Nom de commercial :
                                {{ purchase.purchase_article[0].fournisseur.commercial_name }}
                            </p>
                        </div>
                        <div class="d-flex align-items-center mt-3">
                            <i class="ti ti-chevron-right f-18"></i>
                            <p class="mb-0">
                                Téléphone de commercial :
                                {{ purchase.purchase_article[0].fournisseur.commercial_phone }}
                            </p>
                        </div>
                        <div class="d-flex align-items-center mt-3">
                            <i class="ti ti-chevron-right f-18"></i>
                            <p class="mb-0">
                                Téléphone de soustraitant :
                                {{
                                    (purchase.purchase_article[0].fournisseur.phone_no_1 ?? 'N/A') +
                                    ' / ' +
                                    (purchase.purchase_article[0].fournisseur.phone_no_2 ?? 'N/A')
                                }}
                            </p>
                        </div>
                        <div class="d-flex align-items-center mt-3">
                            <i class="ti ti-chevron-right f-18"></i>
                            <p class="mb-0">
                                Adresse :
                                {{ purchase.purchase_article[0].fournisseur.adresse ?? 'N/A' }}
                            </p>
                        </div>
                        <div class="d-flex align-items-center mt-3">
                            <i class="ti ti-chevron-right f-18"></i>
                            <p class="mb-0">
                                Ville :
                                {{ purchase.purchase_article[0].fournisseur.ville ?? 'N/A' }}
                            </p>
                        </div>
                    </div>
                </div>


            </div>
        </div>

    </div>
</template>

<style>
.bottom-image {
    position: fixed;
    bottom: 35px;
    width: 80%;
    /* Adjust the width as needed */
}

.f-18 {
    font-size: 18px;
}

.f-36 {
    font-size: 36px;
}

.empty_stats_img_md {
    width: 100%;
    max-width: 180px;
    margin: 0 auto;
}

.only-in-mobile {
    display: block;
}

.hide-in-mobile {
    display: none;
}

@media (min-width: 980px) {
    .only-in-mobile {
        display: none;
    }

    .hide-in-mobile {
        display: block;
    }
}
</style>
