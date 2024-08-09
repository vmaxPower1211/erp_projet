import { createSignal } from "solid-js";

const [dataIdEvent, setDataIDEvent] = createSignal(0);
const [dataIdWeekly, setDataIDWeekly] = createSignal(0);
const [dataIdMonthly, setDataIDMonthly] = createSignal(0);

export {
    dataIdWeekly, 
    setDataIDWeekly, 
    dataIdEvent, 
    setDataIDEvent, 
    dataIdMonthly, 
    setDataIDMonthly
}

const [dataIdEventDK, setDataIDEventDK] = createSignal(0);
const [dataIdWeeklyDK, setDataIDWeeklyDK] = createSignal(0);
const [dataIdMonthlyDK, setDataIDMonthlyDK] = createSignal(0);

export {
    dataIdWeeklyDK, 
    setDataIDWeeklyDK, 
    dataIdEventDK, 
    setDataIDEventDK, 
    dataIdMonthlyDK, 
    setDataIDMonthlyDK
}

const [selectedCategory, setSelectedCategory] = createSignal('');

export {selectedCategory, setSelectedCategory}
