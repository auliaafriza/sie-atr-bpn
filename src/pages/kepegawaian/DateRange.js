import React, { useState, useCallback } from "react";
import "./styles.css";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import PropTypes from "prop-types";
import { id } from "date-fns/locale";
import { DateRangePicker, createStaticRanges } from "react-date-range";
import DateRangeIcon from "@material-ui/icons/DateRange";
import ClearIcon from "@material-ui/icons/Clear";
import {
  addDays,
  endOfDay,
  startOfDay,
  startOfMonth,
  endOfMonth,
} from "date-fns";
import { Box, Popover } from "@material-ui/core";

const defineds = {
  startOfToday: startOfDay(new Date()),
  startOfLastSevenDay: startOfDay(addDays(new Date(), -7)),
  startOfLastThirtyDay: startOfDay(addDays(new Date(), -30)),
  endOfToday: endOfDay(new Date()),
  startOfYesterday: startOfDay(addDays(new Date(), -1)),
  endOfYesterday: endOfDay(addDays(new Date(), -1)),
  startOfMonth: startOfMonth(new Date()),
  endOfMonth: endOfMonth(new Date()),
};

const sideBarOptions = () => {
  const customDateObjects = [
    {
      label: "Hari Ini",
      range: () => ({
        startDate: defineds.startOfToday,
        endDate: defineds.endOfToday,
      }),
    },
    {
      label: "Kemarin",
      range: () => ({
        startDate: defineds.startOfYesterday,
        endDate: defineds.endOfYesterday,
      }),
    },
    {
      label: "7 Hari Terakhir",
      range: () => ({
        startDate: defineds.startOfLastSevenDay,
        endDate: defineds.endOfToday,
      }),
    },
    {
      label: "30 Hari Terakhir",
      range: () => ({
        startDate: defineds.startOfLastThirtyDay,
        endDate: defineds.endOfToday,
      }),
    },
    {
      label: "Bulan Ini",
      range: () => ({
        startDate: defineds.startOfMonth,
        endDate: defineds.endOfMonth,
      }),
    },
  ];

  return customDateObjects;
};

const textTransformOrigin = {
  vertical: "top",
  horizontal: "left",
};

export default function Component({
  onSelectDate,
  placeholder,
  ranges,
  color,
  onClear,
  isReport,
  isPlaceHolder,
  isBudget,
  startDate,
  endDate,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const sideBar = sideBarOptions();
  const [transformOrigin, setTransformOrigin] = useState(textTransformOrigin);

  const handleClick = (event, transform) => {
    setAnchorEl(event.currentTarget);
    setTransformOrigin(transform);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const staticRanges = [...createStaticRanges(sideBar)];

  const handleOnclear = useCallback((e) => {
    e.stopPropagation();
    onClear();
  }, []);

  return (
    <Box>
      <Box
        color={color}
        className={
          isReport ? "DateRangeinputWrapperReport" : "DateRangeinputWrapper"
        }
        onClick={(e) => handleClick(e, textTransformOrigin)}
      >
        <Box flex="1">{placeholder}</Box>
        <Box display="flex">
          {placeholder === "Rentang Tanggal" ? null : isPlaceHolder ? null : (
            <ClearIcon className="clearIcon" onClick={handleOnclear} />
          )}
          <DateRangeIcon className="dateRangeIcon" />
        </Box>
      </Box>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={transformOrigin}
      >
        <DateRangePicker
          showDateDisplay={false}
          ranges={ranges}
          onChange={onSelectDate}
          months={2}
          staticRanges={[]}
          direction="horizontal"
          locale={id}
          inputRanges={[]}
          className="dateRangeContainer"
        />
      </Popover>
    </Box>
  );
}

Component.propTypes = {
  placeholder: PropTypes.string,
  onSelectDate: PropTypes.func,
  ranges: PropTypes.array,
  color: PropTypes.string,
  onClear: PropTypes.func,
  isReport: PropTypes.bool,
  isPlaceHolder: PropTypes.bool,
  isBudget: PropTypes.bool,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
};
