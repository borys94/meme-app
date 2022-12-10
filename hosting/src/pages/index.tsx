import { useState } from "react";
import { Card, CardContent, Container } from "@mui/material";

import Tabs from "@components/common/Tabs";
import MemeCreator from "@components/MemeCreator";
import FavouritesMemes from "@components/FavouritesMemes";
import PopularMemes from "@components/PopularMemes";

import { TemplateModel } from "@shared/models/template";

export default function IndexPage() {
  const [currentTemplate, setCurrentTemplate] = useState<TemplateModel | null>(
    null
  );
  const handleTemplateClick = (template: TemplateModel) => {
    setCurrentTemplate(template);
  };

  return (
    <Container>
      <Card>
        <CardContent>
          <Tabs
            items={[
              {
                label: "Popular",
                render: () => (
                  <PopularMemes handleTemplateClick={handleTemplateClick} />
                ),
              },
              {
                label: "Favourites",
                render: () => <FavouritesMemes />,
              },
            ]}
          />
          <MemeCreator template={currentTemplate} />
        </CardContent>
      </Card>
    </Container>
  );
}
