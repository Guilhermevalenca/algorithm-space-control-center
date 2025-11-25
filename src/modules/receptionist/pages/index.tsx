import { useEffect, useState } from "react";
import type { ReceptionistEntity } from "../entities/receptionist.entity";
import database from "../../../plugins/database";
import { AddSpecialistAssistanceInReceptionist } from "../components/add-specialist-assistance-in-receptionist";
import { useForceUpdate } from "../../../utils/force-reload";
import { AddCall } from "../components/add-call";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { ShowStatistics } from "../../statistics/components/show-statistics";
import Accordion from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

export default function Receptionist() {
  const forceUpdate = useForceUpdate();
  const [receptionist, setReceptionist] = useState<ReceptionistEntity>();
  const [quantSpecialist, setQuantSpecialist] = useState(0);

  useEffect(() => {
    if (database.data.receptionists) {
      setReceptionist(database.data.receptionists[0]);
    }
  }, []);
  useEffect(() => {
    if (database.data.specialist_assistances) {
      setQuantSpecialist(database.data.specialist_assistances.length);
    }
  });
  return (
    <>
    <Card>
      <CardContent>
        <h1>Gestão de chamados</h1>
        <Stack spacing={4}>
          <Stack>
            <Box>
              <ShowStatistics/>
            </Box>
          <Box sx={{ mr: "auto" }}>
            <p>Quantidade de especialistas no momento: {quantSpecialist}</p>
            </Box>
            <Box sx={{ mr: "auto" }}>
               {receptionist && (
            <AddSpecialistAssistanceInReceptionist
              receptionist={receptionist}
              forceUpdate={() => forceUpdate()}
            />
         )}
          </Box>
        </Stack>
        <Stack>
         <Box sx={{ mr: "auto" }}>
          <h2>Encaminhar próximo chamado</h2>
         </Box>
         <Box sx={{ mr: "auto" }}>
          {receptionist && <AddCall receptionist={receptionist} />}
         </Box>
        </Stack>
        </Stack>
      </CardContent>
    </Card>
    </>
  );
}
