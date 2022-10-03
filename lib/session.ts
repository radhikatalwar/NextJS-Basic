export async function getAuthSession(ctx: any) {
  return ctx.req.session.get("user");
}
