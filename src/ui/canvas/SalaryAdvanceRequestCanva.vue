<script setup lang="ts">
</script>

<template>
    <div class="offcanvas offcanvas-end off-canva-width" tabindex="-1" id="salaryAdvanceRequest"
        aria-labelledby="offcanvasEndLabel">
        <div class="offcanvas-header">
            <h5 id="offcanvasEndLabel" class="offcanvas-title">Demande d'avance sur salaire
            </h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body  mx-0 flex-grow-0">
            <form action="">
                <div class="row">
                    <div class="col-12">
                        <div class="mb-3">
                            <label for="duration" class="form-label">Montant de l'avance <span
                                    class="text-danger">*</span> </label>
                            <input type="number" class="form-control" id="duration" placeholder="Entrez le montant"
                                required>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="mb-3">
                            <label for="duration" class="form-label">Montant de déduction par mois <span
                                    class="text-danger">*</span> </label>
                            <input type="number" class="form-control" id="duration"
                                placeholder="Entrez le montant de déduction" required>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="mb-3">
                            <label for="message" class="form-label">Message</label>
                            <textarea class="form-control" id="message" rows="5" placeholder="Message"
                                required></textarea>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="alert alert-warning" role="alert">
                            Votre demande d'avance sur salaire doit être approuvée par votre superviseur.
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 d-flex justify-content-end">
                        <button type="button" class="btn close-button btn-label-outline-dark"
                            data-bs-dismiss="offcanvas">Annuler</button>
                        <button type="submit" class="btn btn-primary">Envoyer</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>