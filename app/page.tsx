import { redirect } from "next/navigation";

// A raiz aponta para a variante A por padrão.
// O split do teste A/B é feito nos conjuntos de anúncio da Meta:
// cada conjunto aponta direto para /a ou /b.
export default function Home() {
  redirect("/a");
}
