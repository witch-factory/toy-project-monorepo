"use client";

import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("HomePage");
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      <h1>{t("title")}</h1>
    </div>
  );
}
