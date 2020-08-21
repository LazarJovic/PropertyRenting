package propertyrenting.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import propertyrenting.user.enumeration.PermissionType;
import propertyrenting.user.model.Permission;
import propertyrenting.user.repository.PermissionRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class PermissionService {

    private PermissionRepository permissionRepository;

    @Autowired
    public PermissionService(PermissionRepository permissionRepository) {
        this.permissionRepository = permissionRepository;
    }

    private Permission create(Permission permission) {
        return this.permissionRepository.save(permission);
    }

    private List<Permission> findAll() {
        return this.permissionRepository.findAll();
    }

    public List<Permission> initPermissions() {
        if(!this.findAll().isEmpty()) {
            return null;
        }
        List<Permission> permissions = new ArrayList<>();
        for(PermissionType permissionType: PermissionType.values()) {
            Permission p = new Permission(permissionType);
            Permission newPermission = null;
            try {
                newPermission = this.create(p);
            } catch (Exception e) {
                e.printStackTrace();
            }
            permissions.add(newPermission);
        }
        return permissions;
    }

}
