import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Collapse } from "@mui/material";
import styles from "./AccordionRow.module.scss";

interface IAccordionProps {
    borders?: "none" | "both";
    title: string;
    children?: React.ReactNode;
    isExpanded?: boolean;
}

function AccordionRow({
    borders,
    title,
    children,
    isExpanded = false,
}: IAccordionProps) {
    const [isActive, setIsActive] = useState(isExpanded);

    return (
        <div
            className={`${styles.accordionRow} ${borders &&
                (borders === "none"
                    ? styles.accordionRow_border_none
                    : styles.accordionRow_border_bottom)
                }`}
        >
            <button
                type="button"
                className={styles.accordionTitle}
                onClick={() => {
                    setIsActive(!isActive);
                }}
            >
                <div>{title}</div>
                <div
                    className={`${styles.accordionArrow} ${isActive && styles.accordionArrow_opened
                        }`}
                >
                    <ExpandMoreIcon />
                </div>
            </button>
            <Collapse in={isActive}>
                <div
                    className={styles.accordionContent}
                    aria-expanded={isActive}
                >
                    {children}
                </div>
            </Collapse>
        </div>
    );
}

export default AccordionRow;
