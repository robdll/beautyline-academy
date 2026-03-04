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

export const MOCK_PRODUCTS = [
    {
        id: 1,
        title: "Crema Idratante",
        description: "Idratazione profonda e duratura. La sua formula leggera penetra rapidamente, lasciando la pelle fresca, morbida e perfettamente equilibrata per tutto il giorno.",
        price: 29.90,
        publicId: "crema-idra_hew3ri"
    },
    {
        id: 2,
        title: "Crema Nutriente",
        description: "Un tratamento intensivo per pelli secche e stanche. Ricca di nutrienti essenziali, ripristina la barriera naturale della pelle donando elasticità e un aspetto vellutato.",
        price: 45.00,
        publicId: "crema-nutri_bvv4bu"
    },
    {
        id: 3,
        title: "Crema Antirughe",
        description: "Combatte attivamente i segni dell'invecchiamento. Grazie alla sua potente azione rigenerante, leviga le piccole rughe e restituisce compattezza e giovinezza al viso.",
        price: 50.00,
        publicId: "crema-antiru_cnkbdj"
    },
    {
        id: 4,
        title: "Kit Di Gel",
        description: "Il set professionale definitivo per la ricostruzione unghie. Include tutto il necessario per creare nail art durature, brillanti e di altissima qualità tecnica.",
        price: 75.00,
        publicId: "products_yclkv1"
    }
];
