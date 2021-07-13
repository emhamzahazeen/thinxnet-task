export default async (userService, supportAgentService) => {
  userService.create({ isActive: true });
  supportAgentService.create({ isActive: true });
  supportAgentService.create({ isActive: true });
  supportAgentService.create({ isActive: true });
  supportAgentService.create({ isActive: true });
};
