import React, { useState } from "react";
import { Button, Switch, ThemeIcon } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useLocalStorage } from "@mantine/hooks";
import LanguageIcon from "@/assets/logo/LanguageIcon";
const LanguagePicker = () => {
  const { i18n } = useTranslation();
  // const [isKhmer, setIsKhmer] = useLocalStorage({ key: "language", defaultValue: i18n.language === "en" });

  const [isKhmer, setIsKhmer] = useState(i18n.language === "kh");
  const toggleLanguage = () => {
    const newLang = isKhmer ? "en" : "kh"; // Khmer = "kh"
    setIsKhmer(!isKhmer);
    i18n.changeLanguage(newLang);
  };

  return (
    <Button
      onClick={toggleLanguage}
      variant="transparent"
      size="sm"
      m={0}
      p={0}
    > <ThemeIcon size="lg" variant="outline" color="orange" bd={0} onClick={toggleLanguage} >
    <LanguageIcon/>
  </ThemeIcon></Button>


  );
};

export default LanguagePicker;
