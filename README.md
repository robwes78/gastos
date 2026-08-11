# Mis Gastos

Registro de gastos personales diario, semanal y mensual. Sin backend ni base de datos: todo se guarda en el `localStorage` del navegador.

## Funcionalidades

- Alta, edición y borrado de gastos (importe, categoría, fecha, nota).
- Vistas diaria, semanal y mensual con navegacion entre periodos.
- Totales, número de gastos y media del período.
- Gráfico de evolución y reparto por categoría.
- Exportar a JSON/CSV e importar desde JSON (respaldo manual).

## Stack

Vite + React + TypeScript + Tailwind CSS + Recharts.

## Desarrollo

Requiere Node 22 (ver `.nvmrc`).

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` - servidor de desarrollo.
- `npm run build` - typecheck y build de producción en `dist/`.
- `npm run lint` - oxlint.
- `npm run preview` - sirve el build de producción.

## Despliegue

`npm run build` genera un sitio estático en `dist/`, desplegable en Vercel, Netlify o GitHub Pages.
