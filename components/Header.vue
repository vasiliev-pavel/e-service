<script>
export default {
    data() {
        return {
            isAsideVisible: false,
        };
    },
    methods: {
        toggleAside() {
            this.isAsideVisible = !this.isAsideVisible;
        },
    }
};
</script>
<template>
    <header>

        <nav>
            <span>
                <button @click="toggleAside">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
            </span>
            <span>
                <NuxtLink to="/">
                    E Service
                </NuxtLink>
            </span>
            <span></span>
        </nav>
        <aside v-if="isAsideVisible">
            <div class="divider"></div>
            <NuxtLink to="/companies">Companies</NuxtLink>
            <NuxtLink to="/appointments">Appointments</NuxtLink>
            <div class="divider"></div>
            <NuxtLink to="/account">Account</NuxtLink>
            <NuxtLink to="/settings">Settings</NuxtLink>
            <div class="divider"></div>
            <button>Logout</button>
        </aside>

    </header>
</template>

<style scoped>
header {
    display: flex;
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 50px;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.75);
}

nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 100%;
}

nav span {
    display: flex;
    color: white;
    padding: 5px;
    font-size: 1.3em;
    cursor: pointer;
}

nav span svg {
    height: 40px;
}

aside {
    display: flex;
    flex-direction: column;

    position: absolute;
    background-color: rgba(0, 0, 0, 0.75);
    height: 100vh;
    left: 0;
    right: 0;
    bottom: 0;
    top: 50px;
    color: #fff;

}

aside .divider {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #5E5F64;
    height: 1px;
    width: 80%;
    margin: 10px auto;
    transition: transform 0.3s ease;
}

/* aside:not(.visible) {
    transform: translateX(-100%);
} */

aside.visible {
    transform: translateX(0);
}

aside a,
aside button {
    display: flex;
    width: 80%;
    margin: 10px auto;


    font-size: 1.2em;
    padding: 10px;
    border-radius: 10px;
}

aside a:hover,
aside button:hover {
    background-color: white;
    color: black;
    transition: 0.2s all;
}

@media screen and (min-width: 480px) {}
</style>