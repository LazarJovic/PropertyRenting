package propertyrenting.communication;

import io.grpc.netty.shaded.io.grpc.netty.NettyServerBuilder;
import net.devh.boot.grpc.server.serverfactory.GrpcServerConfigurer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.TimeUnit;

@SpringBootApplication
public class CommunicationApplication {

	public static void main(String[] args) {
		SpringApplication.run(CommunicationApplication.class, args);
	}

}
