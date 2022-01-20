import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as defaultAuthGuard from "../../auth/defaultAuth.guard";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { CountryService } from "../country.service";
import { CountryCreateInput } from "./CountryCreateInput";
import { CountryWhereInput } from "./CountryWhereInput";
import { CountryWhereUniqueInput } from "./CountryWhereUniqueInput";
import { CountryFindManyArgs } from "./CountryFindManyArgs";
import { CountryUpdateInput } from "./CountryUpdateInput";
import { Country } from "./Country";
@swagger.ApiBearerAuth()
export class CountryControllerBase {
  constructor(
    protected readonly service: CountryService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "Country",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: Country })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Body() data: CountryCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Country> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Country",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"Country"} creation is forbidden for roles: ${roles}`
      );
    }
    return await this.service.create({
      data: data,
      select: {
        countryname: true,
        createdAt: true,
        id: true,
        iso2: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "Country",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [Country] })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => CountryFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async findMany(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Country[]> {
    const args = plainToClass(CountryFindManyArgs, request.query);

    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Country",
    });
    const results = await this.service.findMany({
      ...args,
      select: {
        countryname: true,
        createdAt: true,
        id: true,
        iso2: true,
        updatedAt: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "Country",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: Country })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Param() params: CountryWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Country | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Country",
    });
    const result = await this.service.findOne({
      where: params,
      select: {
        countryname: true,
        createdAt: true,
        id: true,
        iso2: true,
        updatedAt: true,
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return permission.filter(result);
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Patch("/:id")
  @nestAccessControl.UseRoles({
    resource: "Country",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Country })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Param() params: CountryWhereUniqueInput,
    @common.Body()
    data: CountryUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Country | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Country",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"Country"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      return await this.service.update({
        where: params,
        data: data,
        select: {
          countryname: true,
          createdAt: true,
          id: true,
          iso2: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Delete("/:id")
  @nestAccessControl.UseRoles({
    resource: "Country",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Country })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Param() params: CountryWhereUniqueInput
  ): Promise<Country | null> {
    try {
      return await this.service.delete({
        where: params,
        select: {
          countryname: true,
          createdAt: true,
          id: true,
          iso2: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }
}
