import { ROUTES } from './routes.constants';

export const HERO_SLIDES = [
    {
        id: 0,
        image: "eyelash_pps2f9",
        alt: "Eyelash Extension",
    },
    {
        id: 1,
        image: "facialTreatment_i80zhy",
        alt: "Facial Treatment",
    },
    {
        id: 2,
        image: "pictureNail_rjeiue",
        alt: "Nail Art",
    }
];

export const SERVICES = [
    {
        id: 1,
        title: "Corsi",
        image: "courseNails_vd4fgi",
        link: ROUTES.COURSES
    },
    {
        id: 2,
        title: "Percorsi Master",
        image: "Paths_xmgp8c",
        link: "/master"
    },
    {
        id: 3,
        title: "Prodotti",
        image: "products_yclkv1",
        link: ROUTES.PRODUCTS
    },
    {
        id: 4,
        title: "Attrezzature",
        image: "equipment_zowchz",
        link: ROUTES.EQUIPMENT
    }
];

export const MACHINE_TYPES = [
    {
        id: 1,
        name: "Viso"
    },
    {
        id: 2,
        name: "Corpo"
    },
    {
        id: 3,
        name: "Depilazione"
    },
    {
        id: 4,
        name: "Multifunzione"
    }
];

export const COSMETICS = [
    {
        id: 1,
        name: "Chris Nails"
    },
    {
        id: 2,
        name: "Skin Renew"
    }
];

export const COURSES = [
    { title: "Nail Design", desc: "Dal base all'avanzato in tecniche di unghie in gel, acrilico, nail art e molto altro." },
    { title: "Ciglia e Sopracciglia", desc: "Extension ciglia, laminazione, design sopracciglia e micropigmentazione." },
    { title: "Trattamenti Viso", desc: "Pulizia del viso, peeling, protocolli anti-età e armonizzazione facciale." }
];
