import { useEffect, useState } from "react";
import { SpecialistAssistanceEntity } from "../entities/specialist_assistance.entity";
import database from "../../../plugins/database";
import { SpecialistEnum } from "../enums/specialist.enum";
import { ShowPanel } from "../components/show-panel";
import { Card, CardContent, Tabs, Tab, Box } from "@mui/material";
import PropTypes from "prop-types";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function SpecialistAssistance() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [specialistAssistanceCom, setSpecialistAssistanceCom] = useState<
    SpecialistAssistanceEntity[]
  >([]);
  const [specialistAssistanceEnergy, setSpecialistAssistanceEnergy] = useState<
    SpecialistAssistanceEntity[]
  >([]);
  const [specialistAssistanceNav, setSpecialistAssistanceNav] = useState<
    SpecialistAssistanceEntity[]
  >([]);
  const [specialistAssistanceLife, setSpecialistAssistanceLife] = useState<
    SpecialistAssistanceEntity[]
  >([]);

  useEffect(() => {
    if (database.data.specialist_assistances) {
      setSpecialistAssistanceCom(
        database.data.specialist_assistances.filter(
          (item) => item.specialist === SpecialistEnum.communications
        )
      );
      setSpecialistAssistanceEnergy(
        database.data.specialist_assistances.filter(
          (item) => item.specialist === SpecialistEnum.energy
        )
      );
      setSpecialistAssistanceNav(
        database.data.specialist_assistances.filter(
          (item) => item.specialist === SpecialistEnum.navigation
        )
      );
      setSpecialistAssistanceLife(
        database.data.specialist_assistances.filter(
          (item) => item.specialist === SpecialistEnum.life_support
        )
      );
    }
  }, []);
  return (
    <>
      <Card>
        <h1>Painel de chamados</h1>
        <CardContent>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                aria-label="basic tabs example"
              >
                <Tab label="Comunicação" {...a11yProps(0)} />
                <Tab label="Energia" {...a11yProps(1)} />
                <Tab label="Suporte à vida" {...a11yProps(2)} />
                <Tab label="Navegação" {...a11yProps(3)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <ShowPanel specialistAssistances={specialistAssistanceCom} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <ShowPanel specialistAssistances={specialistAssistanceEnergy} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <ShowPanel specialistAssistances={specialistAssistanceLife} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
              <ShowPanel specialistAssistances={specialistAssistanceNav} />
            </CustomTabPanel>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
