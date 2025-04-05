import { ReactNode } from 'react';
import { FiCamera, FiUsers, FiHeart, FiPackage, FiHome, FiCalendar } from 'react-icons/fi';
import React from 'react';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  iconComponent: () => ReactNode;
  features: string[];
}

export const services: Service[] = [
  {
    id: 1,
    title: "Fotografía de Bodas",
    description: "Captura el amor, la alegría y los momentos únicos de tu día especial con arte y elegancia.",
    icon: "FiHeart",
    iconComponent: () => React.createElement(FiHeart, { size: 36 }),
    features: [
      "Consulta previa a la boda",
      "Opción de cobertura de día completo",
      "Segundo fotógrafo disponible",
      "Imágenes digitales de alta resolución",
      "Galería privada en línea",
      "Opciones de álbum de bodas artístico"
    ]
  },
  {
    id: 2,
    title: "Fotografía de Retratos",
    description: "Retratos profesionales que capturan tu auténtico ser, ya sea para fines personales o profesionales.",
    icon: "FiUsers",
    iconComponent: () => React.createElement(FiUsers, { size: 36 }),
    features: [
      "Retratos individuales y familiares",
      "Sesiones en estudio o locación",
      "Asesoría de vestuario",
      "Retoque profesional",
      "Paquetes digitales e impresos",
      "Retratos ejecutivos"
    ]
  },
  {
    id: 3,
    title: "Fotografía de Productos",
    description: "Muestra tus productos con imágenes impactantes que elevan tu marca y aumentan las conversiones.",
    icon: "FiPackage",
    iconComponent: () => React.createElement(FiPackage, { size: 36 }),
    features: [
      "Fotografía para e-commerce",
      "Tomas de productos con estilo de vida",
      "Vistas de producto en 360°",
      "Imágenes de catálogo con fondo blanco",
      "Composición creativa",
      "Edición completa en post-producción"
    ]
  },
  {
    id: 4,
    title: "Fotografía Inmobiliaria",
    description: "Fotografía profesional arquitectónica e interior que ayuda a vender propiedades más rápido.",
    icon: "FiHome",
    iconComponent: () => React.createElement(FiHome, { size: 36 }),
    features: [
      "Cobertura interior y exterior",
      "Detalles arquitectónicos",
      "Imágenes HDR",
      "Opción de escenificación virtual",
      "Fotografía aérea disponible",
      "Entrega rápida"
    ]
  },
  {
    id: 5,
    title: "Fotografía de Eventos",
    description: "Documenta tus eventos especiales con cobertura profesional que captura la atmósfera y los momentos clave.",
    icon: "FiCalendar",
    iconComponent: () => React.createElement(FiCalendar, { size: 36 }),
    features: [
      "Eventos corporativos",
      "Conferencias y seminarios",
      "Galas y eventos benéficos",
      "Fiestas de cumpleaños y aniversarios",
      "Cobertura de eventos en vivo",
      "Imágenes listas para redes sociales"
    ]
  },
  {
    id: 6,
    title: "Fotografía de Arte",
    description: "Fotografía artística para coleccionistas, diseñadores de interiores y entusiastas del arte que buscan piezas únicas.",
    icon: "FiCamera",
    iconComponent: () => React.createElement(FiCamera, { size: 36 }),
    features: [
      "Impresiones de edición limitada",
      "Opciones de gran formato",
      "Diversas técnicas de impresión",
      "Enmarcado personalizado disponible",
      "Certificados de autenticidad firmados",
      "Opciones de encargo"
    ]
  }
];
