import { intersection } from "lodash";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { languageOptions } from "../const";
import { genreOptions, getLanguageName } from "../i18n";
import { Movie, Option } from "../types";
import MultiSelect from "./MultiSelect";
import Modal from "./Modal";
import RatingSlider from "./RatingSlider";

type FilterProps = {
  movies: Movie[];
  onChange: (movies: Movie[]) => void;
};

export default function Filter({ onChange, movies }: FilterProps) {
  const [selectedGenres, setSelectedGenres] = useState<Option[]>([]);
  const [ratingRange, setRatingRange] = useState([7, 10]);
  const [selectedLanguages, setSelectedLanguages] = useState<Option[]>([
    { value: "en", label: getLanguageName("en") },
    { value: "de", label: getLanguageName("de") },
  ]);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    onFilterChange();
  }, [selectedGenres, selectedLanguages, ratingRange]);

  return (
    <Container>
      <MultiSelect
        label={t("filter.genres")}
        options={genreOptions}
        selectedOptions={selectedGenres}
        setSelectedOptions={setSelectedGenres}
      />
      <RatingSlider
        value={ratingRange}
        onChange={setRatingRange}
        label={t("filter.rating")}
      />
      <SettingsButton onClick={() => setSettingsOpen(true)} />
      {settingsOpen && (
        <Modal onClose={() => setSettingsOpen(false)}>
          <h3>{t("settings")}</h3>
          <MultiSelect
            label={t("filter.originalLanguages")}
            setSelectedOptions={setSelectedLanguages}
            options={languageOptions}
            selectedOptions={selectedLanguages}
          />
        </Modal>
      )}
    </Container>
  );

  function SettingsButton({ onClick }: { onClick: () => void }) {
    return (
      <StyledSettingsIcon
        onClick={onClick}
        width="24"
        viewBox="0 0 24 24"
        focusable={false}
      >
        <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"></path>
      </StyledSettingsIcon>
    );
  }

  function onFilterChange() {
    const filteredMovies = movies
      .filter(genreFilter)
      .filter(languageFilter)
      .filter(ratingFilter);

    onChange(filteredMovies);
  }

  function ratingFilter(movie: Movie) {
    if (ratingRange.length === 0) return true;

    return movie.rating >= ratingRange[0] && movie.rating <= ratingRange[1];
  }

  function languageFilter(movie: Movie) {
    if (selectedLanguages.length === 0) return true;

    return selectedLanguages
      .map(({ value }) => value)
      .includes(movie.originalLanguage);
  }

  function genreFilter(movie: Movie) {
    if (selectedGenres.length === 0) return true;

    return (
      intersection(
        movie.genres,
        selectedGenres.map((option) => option.value)
      ).length > 0
    );
  }
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 872px;

  @media (max-width: 872px) {
    width: 100vw;
    flex-direction: column;
    align-items: center;
  }
`;

const StyledSettingsIcon = styled.svg`
  cursor: pointer;
  fill: white;

  transition: transform 0.2s;

  :hover {
    transform: rotate(45deg);
  }
`;
