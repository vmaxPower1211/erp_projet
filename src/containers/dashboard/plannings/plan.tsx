import { Component, onMount } from "solid-js";


const Plan: Component = () => {
    onMount(() => {
        console.log('ini halaman plan');
    })

    return (
        <p class="text-4xl text-green-700 text-center py-20">Halaman Planning!</p>
    );
}

export default Plan;