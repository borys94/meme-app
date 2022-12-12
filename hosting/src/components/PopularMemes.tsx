import { useCollectionData, QUERIES } from "@services/queries";
import { TemplateModel, TEMPLATE_STATUS } from "@shared/models/template";

import TemplatesList from "./TemplatesList";

interface Props {
  handleTemplateClick: (template: TemplateModel) => void;
}

export default function PopularMemes({ handleTemplateClick }: Props) {
  const [templates] = useCollectionData<TemplateModel>(QUERIES.GET_TEMPLATES, {
    status: TEMPLATE_STATUS.PUBLISHED,
  });

  return (
    <TemplatesList
      templates={templates}
      handleTemplateClick={handleTemplateClick}
    />
  );
}
