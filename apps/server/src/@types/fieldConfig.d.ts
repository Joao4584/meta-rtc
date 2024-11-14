import type { FastifyReply } from "fastify";

interface SendResponseOptions {
  fastify: FastifyReply;
  statusCode?: number;
  status?: string;
  message?: string | null;
  data?: Record<string, any> | any[] | null;
  config?: ResourceConfig;
}

type ResourceFieldConfig = {
  field: string;
  alias?: string;
  nested?: boolean;
};

type ResourceConfig = Record<string, ResourceFieldConfig | ResourceFieldConfig[]>;
