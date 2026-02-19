// Generic fallback template that works for all other templates by defaulting to Modern style
import ModernTemplate from './ModernTemplate';
import { TemplateProps } from './shared';

export default function GenericTemplate({ data }: TemplateProps) {
    return <ModernTemplate data={data} />;
}
