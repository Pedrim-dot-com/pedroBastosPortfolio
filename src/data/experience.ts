export interface ExperienceProject {
  id: string;
  title: { pt: string; en: string };
  start: string;
  end: string | null;
  tags: string[];
  description: { pt: string; en: string };
}

export interface ExperienceEmployer {
  id: string;
  name: string;
  role: string;
  start: string;
  end: string | null;
  projects: ExperienceProject[];
}

export const experience: ExperienceEmployer[] = [
  {
    id: "celfocus",
    name: "Celfocus",
    role: "Frontend Engineer",
    start: "2023-06",
    end: null,
    projects: [
      {
        id: "onex",
        title: {
          pt: "Vodafone One Experience (OneX)",
          en: "Vodafone One Experience (OneX)",
        },
        start: "2025-01",
        end: null,
        tags: ["React", "TypeScript", "Redux", "Module Federation", "Datadog"],
        description: {
          pt: "Desenvolvimento de novas funcionalidades e manutenção da plataforma em React e TypeScript, numa arquitetura de micro-frontends com Module Federation e bibliotecas partilhadas, incluindo Redux para gestão de estado. Integro APIs, corrijo bugs e hotfixes, e participo na investigação de incidentes em produção, analisando logs e traces no Datadog e os fluxos entre Frontend e Backend — o que me tem levado a investigar e, ocasionalmente, alterar código Java. Apoio também os pipelines de CI/CD e os deployments, e contribuo para a documentação técnica.",
          en: "Developing new features and maintaining the platform in React and TypeScript, within a micro-frontend architecture using Module Federation and shared libraries, including Redux for state management. I integrate APIs, fix bugs and hotfixes, and take part in production incident investigation, analyzing Datadog logs and traces and the flow between Frontend and Backend — which has led me to investigate and occasionally modify Java code. I also support CI/CD pipelines and deployments, and occasionally contribute to technical documentation.",
        },
      },
      {
        id: "ooredoo",
        title: { pt: "Ooredoo", en: "Ooredoo" },
        start: "2024-09",
        end: "2024-12",
        tags: ["React Native", "TypeScript", "Liferay"],
        description: {
          pt: "Aplicação de self-care em React Native e TypeScript, em articulação direta com stakeholders, incluindo suporte a produção presencial no Qatar.",
          en: "Self-care application in React Native and TypeScript, working directly with stakeholders, including on-site production support in Qatar.",
        },
      },
      {
        id: "oneapp",
        title: { pt: "Vodafone OneApp", en: "Vodafone OneApp" },
        start: "2023-06",
        end: "2024-08",
        tags: ["React Native", "TypeScript", "Tealium"],
        description: {
          pt: "Desenvolvimento de novas funcionalidades e correção de bugs em React Native e TypeScript, em articulação com stakeholders.",
          en: "New feature development and bug fixing in React Native and TypeScript, working with stakeholders.",
        },
      },
    ],
  },
  {
    id: "mobiweb",
    name: "Mobiweb",
    role: "React Native Developer",
    start: "2022-05",
    end: "2023-06",
    projects: [
      {
        id: "moomenti",
        title: { pt: "Moomenti", en: "Moomenti" },
        start: "2023-03",
        end: "2023-06",
        tags: ["React Native", "TypeScript"],
        description: {
          pt: "Reconstrução de uma aplicação de reservas de eventos e espaços, em React Native e TypeScript.",
          en: "Rebuild of a reservations/events/spaces application, in React Native and TypeScript.",
        },
      },
      {
        id: "internal-chat",
        title: {
          pt: "Projeto interno — aplicação de chat",
          en: "Internal project — chat application",
        },
        start: "2022-05",
        end: "2023-03",
        tags: ["React Native", "TypeScript", "Firebase"],
        description: {
          pt: "Projeto interno de aplicação de chat, em React Native e TypeScript.",
          en: "Internal chat application project, in React Native and TypeScript.",
        },
      },
    ],
  },
];
