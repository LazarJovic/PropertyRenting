package propertyrenting.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import propertyrenting.user.enumeration.PermissionType;
import propertyrenting.user.enumeration.RoleType;
import propertyrenting.user.model.Permission;
import propertyrenting.user.model.Role;
import propertyrenting.user.repository.RoleRepository;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class RoleService {

    private RoleRepository roleRepository;

    private PermissionService permissionService;

    @Autowired
    public RoleService(RoleRepository roleRepository, PermissionService permissionService) {
        this.roleRepository = roleRepository;
        this.permissionService = permissionService;
    }

    public void initRoles() {
        List<Permission> permissions = this.permissionService.initPermissions();

        if(this.roleRepository.findAll().size() != 0) {
            return;
        }

        Role roleAdmin = new Role(RoleType.ROLE_ADMIN);
        Role roleLandlord = new Role(RoleType.ROLE_LANDLORD);
        Role roleTenant = new Role(RoleType.ROLE_TENANT);

        Set<Permission> adminPermissions = new HashSet<>();
        Set<Permission> tenantPermissions = new HashSet<>();
        Set<Permission> landlordPermissions = new HashSet<>();

        for(Permission p : permissions) {
            if(p.getPermissionType().equals(PermissionType.PROPERTY_TYPE_CREATE)) {
                adminPermissions.add(p);
            }
            else if(p.getPermissionType().equals(PermissionType.PROPERTY_CREATE)
                    || p.getPermissionType().equals(PermissionType.MY_PROPERTY_OVERVIEW)
                    || p.getPermissionType().equals(PermissionType.AD_CREATE)) {
                landlordPermissions.add(p);
            }
            else if(p.getPermissionType().equals(PermissionType.PROPERTY_TYPE_OVERVIEW)) {
                adminPermissions.add(p);
                landlordPermissions.add(p);
            }
            else {
                adminPermissions.add(p);
                landlordPermissions.add(p);
                tenantPermissions.add(p);
            }
        }

        roleAdmin.setPermissionSet(adminPermissions);
        this.roleRepository.save(roleAdmin);

        roleLandlord.setPermissionSet(landlordPermissions);
        this.roleRepository.save(roleLandlord);

        roleTenant.setPermissionSet(tenantPermissions);
        this.roleRepository.save(roleTenant);
    }

    public Set<Role> findByType(RoleType type) {
        Role role = this.roleRepository.findByRoleType(type);
        Set<Role> roles = new HashSet<>();
        roles.add(role);
        return roles;
    }

}
