import Link from "next/link";
import Image from "next/image";
import {
  Card,
  TextField,
  CardContent,
  Container,
  Stack,
  Button,
  IconButton,
} from "@mui/material";

import TextFieldsIcon from "@mui/icons-material/TextFields";
import EditIcon from "@mui/icons-material/Edit";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";

import Tabs from "@components/admin/Tabs";

export default function AdminPage() {
  return (
    <Container>
      <Card>
        <CardContent>
          <Tabs />
        </CardContent>
      </Card>
    </Container>
  );
}
