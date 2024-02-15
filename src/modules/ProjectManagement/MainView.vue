
<script setup lang="ts"></script>
<template>
    <div>
        <aside class="sidebar locked">
            <div class="logo_items text-center mt-2 pt-2">
                <img src="/src/assets/img/Logo_white_bg.png" alt="logo" class="logo" srcset="" />
            </div>

            <div class="menu_container mt-4 ps-0">
                <div class="menu_items">
                    <ul class="menu_item ps-1">
                        <div class="menu_title flex">
                            <small class="title text-muted fw-normal">Menu</small>
                            PM
                        </div>
                       
                    </ul>
                </div>
            </div>
        </aside>
    </div>
</template>

<style scoped>
.flex {
    display: flex;
    align-items: center;
}

.nav_image {
    display: flex;
    min-width: 55px;
    justify-content: center;
}

.nav_image img {
    height: 35px;
    width: 35px;
    border-radius: 50%;
    object-fit: cover;
}

.active {
    background-color: #fdfdfd;
    color: #191919 !important;
    border-radius: 8px;
}

.active > .link {
    color: #0f0f0f;
    background-color: #fdfdfd;
}

/* Sidebar */
.sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 290px;
    background: #2a3042;
    padding: 15px 10px;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
    transition: all 0.4s ease;
    border-right: 10px solid #2a3042;
}

.sidebar-small {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 90px;
    background: #2a3042;
    padding: 15px 10px;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
    transition: all 0.4s ease;
    border-right: 10px solid #2a3042;
}

.side .sidebar.close {
    width: calc(55px + 20px);
}

.logo_items {
    gap: 8px;
}

.logo_items img {
    width: 60%;
}

.logo_name {
    font-size: 22px;
    color: #fdfdfd;
    font-weight: 500px;
    transition: all 0.3s ease;
}

.sidebar.close .logo_name,
.sidebar.close #lock-icon,
.sidebar.close #sidebar-close {
    opacity: 0;
    pointer-events: none;
}

#lock-icon,
#sidebar-close {
    padding: 10px;
    color: #4070f4;
    font-size: 25px;
    cursor: pointer;
    margin-left: -4px;
    transition: all 0.3s ease;
}

#sidebar-close {
    display: none;
    color: #333;
}

.menu_container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 40px;
    overflow-y: auto;
    height: calc(100% - 60px);
}

.menu_container::-webkit-scrollbar {
    display: none;
}

.menu_title {
    position: relative;
    height: 50px;
    width: 55px;
}

.menu_title .title {
    margin-left: 15px;
    color: #fdfdfd;
    font-size: 16px;
    transition: all 0.3s ease;
}

.sidebar.close .title {
    opacity: 0;
}

.menu_title .line {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    height: 3px;
    width: 20px;
    border-radius: 25px;
    background: #fdfdfd;
    transition: all 0.3s ease;
}

.menu_title .line {
    opacity: 0;
}

.sidebar.close .line {
    opacity: 1;
}

.item {
    font-weight: 500;
    list-style: none;
}

.link {
    text-decoration: none;
    border-radius: 8px;
    margin-bottom: 8px;
    color: #fdfdfd;
}

.link:hover {
    color: #0f0f0f;
    background-color: #fdfdfd;
}

.link span {
    white-space: nowrap;
}

.link i {
    height: 50px;
    min-width: 55px;
    display: flex;
    font-size: 22px;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
}

.sidebar_profile {
    padding-top: 15px;
    margin-top: 15px;
    gap: 15px;
    border-top: 2px solid rgba(0, 0, 0, 0.1);
}

.sidebar_profile .name {
    font-size: 18px;
    color: #333;
}

.sidebar_profile .email {
    font-size: 15px;
    color: #333;
}

/* Navbar */
.navbar {
    max-width: 500px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 60%;
    transform: translateX(-50%);
    background: #fff;
    padding: 10px 20px;
    border-radius: 0 0 8px 8px;
    justify-content: space-between;
}

#sidebar-open {
    font-size: 30px;
    color: #333;
    cursor: pointer;
    margin-right: 20px;
    display: none;
}

.search_box {
    height: 46px;
    max-width: 500px;
    width: 100%;
    border: 1px solid #aaa;
    outline: none;
    border-radius: 8px;
    padding: 0 15px;
    font-size: 18px;
    color: #333;
}

.navbar img {
    height: 40px;
    width: 40px;
    margin-left: 20px;
}

.data_text > h6,
.data_text > small {
    color: #fdfdfd !important;
}

@media (max-width: 1459px) {
    .sidebar {
        display: none; /* Hide the sidebar */
    }
    .sidebar-small {
        display: block; /* Hide the sidebar */
    }
    .sidebar-small .item:hover .link span {
        display: inline-block; /* Show the text */
        white-space: nowrap; /* Keep it on one line */
        background-color: #fdfdfd; /* Light background for the tooltip */
        color: #2a3042; /* Dark text for readability */
        padding: 5px 10px; /* Padding around the text */
        border-radius: 4px; /* Rounded corners for the tooltip */
        position: absolute; /* Position it relative to the hovered item */
        left: 100%; /* Move it to the right of the item */
        top: 50%; /* Align it vertically centered */
        transform: translateY(-50%); /* Adjust vertical position */
        margin-left: 10px; /* Space between icon and tooltip */
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2); /* Slight shadow for depth */
        z-index: 100; /* Ensure it's above other content */
        font-size: 14px; /* Suitable font size */
    }

    .sidebar-small .item {
        position: relative; /* Needed for absolute positioning of the child */
    }
}

@media (min-width: 1459px) {
    .sidebar {
        display: block; /* Hide the sidebar */
    }
    .sidebar-small {
        display: none; /* Hide the sidebar */
    }
}

.logo {
    width: 86%;
}
.logo_small {
    width: 100%;
}
</style>